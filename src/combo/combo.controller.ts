import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Req,
  Res,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateComboDto, UpdateComboDto } from './dto/combo.dto';
import { Response, Request } from 'express';
import { ComboService } from './combo.service';
import { Roles } from '../common/decorator/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ROLE_LIST } from '../common/constant';
import { getFilterObject } from 'src/common/function';
import { UserLoggedInDto } from 'src/user/dto/user.dto';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { RolesGuard } from 'src/common/guard/roles.guard';

@Controller('combos')
@UseInterceptors(ClassSerializerInterceptor)
export class ComboController {
  constructor(private readonly comboService: ComboService) {}

  @Roles([ROLE_LIST.STORE_OWNER])
  @Post('/')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseFilters(new HttpExceptionFilter())
  async addEmployee(
    @Body() createComboData: CreateComboDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = req.user as UserLoggedInDto;
      const combo = await this.comboService.createNewCombo(
        createComboData,
        user.storeList,
      );
      res.status(HttpStatus.OK).json({ data: combo });
    } catch (e) {
      throw e;
    }
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Get('/')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseFilters(new HttpExceptionFilter())
  async getListComboFiltered(@Req() req: Request, @Res() res: Response) {
    try {
      const user = req.user as UserLoggedInDto;
      const filterOption = getFilterObject(req);
      const comboList = await this.comboService.getListCombo(
        req.query['storeId'].toString(),
        user.storeList,
        filterOption,
      );
      res.status(HttpStatus.OK).json({ data: comboList });
    } catch (e) {
      throw e;
    }
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Get('/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseFilters(new HttpExceptionFilter())
  async getComboInfo(
    @Param() params: { id: number },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = req.user as UserLoggedInDto;
      const combo = await this.comboService.getComboById(
        params.id,
        user.storeList,
      );
      res.status(HttpStatus.OK).json({ data: combo });
    } catch (e) {
      throw e;
    }
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Get('/all/:storeId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseFilters(new HttpExceptionFilter())
  async getAllCombo(
    @Param() params: { storeId: number },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = req.user as UserLoggedInDto;
      const combo = await this.comboService.getAllByStoreId(
        params.storeId,
        user.storeList,
      );
      res.status(HttpStatus.OK).json({ data: combo });
    } catch (e) {
      throw e;
    }
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Put('/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseFilters(new HttpExceptionFilter())
  async updateComboInfo(
    @Param() params: { id: string },
    @Body() updateComboData: UpdateComboDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    if (parseInt(params.id) !== updateComboData.id) {
      throw new BadRequestException('Invalid request');
    }
    try {
      const user = req.user as UserLoggedInDto;
      const combo = await this.comboService.updateComboInfo(
        updateComboData,
        user.storeList,
      );
      res.status(HttpStatus.OK).json({ data: combo });
    } catch (e) {
      throw e;
    }
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Patch('/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseFilters(new HttpExceptionFilter())
  async updateComboStatus(
    @Param() params: { id: string },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = req.user as UserLoggedInDto;
      const combo = await this.comboService.updateComboStatus(
        parseInt(params.id),
        user.storeList,
      );
      res.status(HttpStatus.OK).json({ data: combo });
    } catch (e) {
      throw e;
    }
  }
  @Roles([ROLE_LIST.STORE_OWNER])
  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseFilters(new HttpExceptionFilter())
  async deleteCombo(
    @Param() params: { id: string },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = req.user as UserLoggedInDto;
      const combo = await this.comboService.deleteCombo(
        parseInt(params.id),
        user.storeList,
      );
      res.status(HttpStatus.OK).json({ data: combo });
    } catch (e) {
      throw e;
    }
  }
}
