import {
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
import { CreatePromoCodeDto, UpdatePromoCodeDto } from './dto/promo.dto';
import { Response, Request } from 'express';
import { PromoService } from './promo.service';
import { Roles } from '../common/decorator/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { KeyValue, ROLE_LIST } from '../common/constant';
import { getFilterObject } from 'src/common/function';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { UserLoggedInDto } from 'src/user/dto/user.dto';

@Controller('promo')
@UseInterceptors(ClassSerializerInterceptor)
export class PromoController {
  constructor(private readonly promoService: PromoService) {}

  @Roles([ROLE_LIST.STORE_OWNER])
  @Post('/code')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseFilters(new HttpExceptionFilter())
  async addSpaceGroup(
    @Body() data: CreatePromoCodeDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = req.user as { id: number; storeList: Array<{ id: string }> };
      const promo = await this.promoService.addNewPromo(data, user);
      res.status(HttpStatus.OK).json({ data: promo });
    } catch (e) {
      throw e;
    }
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Get('/code')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseFilters(new HttpExceptionFilter())
  async getListPromoCodeFiltered(@Req() req: Request, @Res() res: Response) {
    try {
      const user = req.user as UserLoggedInDto;
      const filterOption = getFilterObject(req);
      const codeList = await this.promoService.getListPromoCode(
        req.query['storeId'].toString(),
        user.storeList,
        filterOption,
      );
      res.status(HttpStatus.OK).json({ data: codeList });
    } catch (e) {
      throw e;
    }
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Get('/code/:code')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseFilters(new HttpExceptionFilter())
  async getDetailCode(
    @Param() params: { code: string },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = req.user as UserLoggedInDto;
      const code = await this.promoService.getDetailPromoCode(
        params.code,
        user.storeList,
      );
      res.status(HttpStatus.OK).json({ data: code });
    } catch (e) {
      throw e;
    }
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Put('/code/:code')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseFilters(new HttpExceptionFilter())
  async updateDetailCode(
    @Param() params: { code: string },
    @Body() data: UpdatePromoCodeDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = req.user as UserLoggedInDto;
      const code = await this.promoService.updatePromoCode(
        params.code,
        data,
        user.storeList,
      );
      res.status(HttpStatus.OK).json({ data: code });
    } catch (e) {
      throw e;
    }
  }
}
