import {
  Controller,
  Post,
  UseGuards,
  Req,
  Res,
  HttpStatus,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseFilters,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { UsersService } from 'src/user/users.service';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { Roles } from 'src/common/decorator/roles.decorator';
import { ROLE_LIST } from 'src/common/constant';
import { RolesGuard } from 'src/common/guard/roles.guard';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Req() req: Request, @Res() res: Response) {
    const data = req.user;
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data,
    });
  }

  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  async refresh(
    @Req() req: Request,
    @Res() res: Response,
    @Body() refreshTokenDto: RefreshTokenDto,
  ) {
    const { id } = refreshTokenDto;
    const tokens = req.user;
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: { tokens },
    });
  }

  @Post('verify')
  @UseFilters(new HttpExceptionFilter())
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles([ROLE_LIST.STORE_OWNER])
  async verifyUser(@Req() req: Request, @Res() res: Response) {
    const user: Express.User = req.user;
    if (user) {
      const response = await this.userService.getUserVerified(user['id']);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: response,
      });
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('verify-sale')
  @UseFilters(new HttpExceptionFilter())
  @UseGuards(AuthGuard('jwt'))
  async verifySaleUser(
    @Body() store: { id: number },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user: Express.User = req.user;
      if (user) {
        const response = await this.userService.getSaleUserVerified(
          user['id'],
          user['role'],
          store.id || 0,
        );
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data: response,
        });
      }
    } catch (e) {
      throw e;
    }
  }

  @Post('switch')
  @UseGuards(AuthGuard('jwt'))
  @UseFilters(new HttpExceptionFilter())
  async switchRole(
    @Body() data: { passCode: string; storeId: number },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user: Express.User = req.user;
    if (user) {
      const response = await this.authService.switchRole(
        {
          id: user['id'],
          storeList: user['storeList'],
          role: user['role'],
        },
        data,
      );
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: response,
      });
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
