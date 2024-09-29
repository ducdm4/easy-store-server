import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  Res,
  Sse,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  CreateUserDto,
  UpdateUserPayloadDto,
  ChangePasswordDto,
} from './dto/user.dto';
import { Response, Request } from 'express';
import { UsersService } from './users.service';
import { UsersPipe } from './pipes/users.pipe';
import { Roles } from '../common/decorator/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ROLE_LIST } from '../common/constant';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Roles([ROLE_LIST.ADMIN])
  @Get()
  findAll() {
    return this.userService.getUser();
  }

  @Roles([ROLE_LIST.ADMIN])
  @Get('detail/:id')
  @UseGuards(AuthGuard('jwt'))
  findUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findUserById(id);
  }

  @Get('self')
  @UseGuards(AuthGuard('jwt'))
  async getLoggedInUser(@Req() req: Request, @Res() res: Response) {
    const user = req.user;
    const userInfo = await this.userService.findSelfUser(user);
    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        userInfo,
      },
    });
  }

  @Post()
  @Roles([ROLE_LIST.ADMIN])
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const user = await this.userService.addUser(createUserDto, '123456');
    res.status(HttpStatus.OK).json({ id: user });
  }

  @Post('register')
  async selfRegisterUser(
    @Body('', UsersPipe) createUserDto: CreateUserDto,
    @Res() res: Response,
  ) {
    const user = await this.userService.addUser(
      createUserDto,
      createUserDto.password,
    );
    res.status(HttpStatus.OK).json({ data: user });
  }

  @Put('detail/:id')
  @Roles([ROLE_LIST.ADMIN])
  updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserPayloadDto: UpdateUserPayloadDto,
  ) {
    // this.userService.updateUser(id, updateUserPayloadDto);
  }

  @Put('change-password')
  @UseGuards(AuthGuard('jwt'))
  async changePassword(
    @Body() passwordInfo: ChangePasswordDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = req.user;
    const response = await this.userService.updatePassword(passwordInfo, user);
    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        response,
      },
    });
  }

  @Put('self')
  @Roles([ROLE_LIST.ADMIN])
  async updateSelfInfo(
    @Body() updateUserPayloadDto: UpdateUserPayloadDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    let addressInfo;
    const updateUserDto = updateUserPayloadDto;

    const userInfo = await this.userService.updateSelfInfo(
      updateUserDto,
      req.user['id'],
    );
    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        userInfo,
      },
    });
  }

  @Put('notification')
  async updateNotificationToken(
    @Body() data: { token: string },
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const response = this.userService.updateNotificationToken(
      req.user['id'],
      data.token,
    );
    response.then(
      (data) => {
        res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          data: data,
        });
      },
      (fail) => {
        res
          .status(fail.getStatus === 'function' ? fail.getStatus() : 500)
          .json({
            statusCode:
              typeof fail.getStatus === 'function' ? fail.getStatus() : 500,
            message: 'Something went wrong',
            data: {},
          });
      },
    );
  }
}