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
import { CreatePromoCodeDto } from './dto/promo.dto';
import { Response, Request } from 'express';
import { PromoService } from './promo.service';
import { Roles } from '../common/decorator/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { KeyValue, ROLE_LIST } from '../common/constant';
import { getFilterObject } from 'src/common/function';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { RolesGuard } from 'src/common/guard/roles.guard';

@Controller('promo')
@UseInterceptors(ClassSerializerInterceptor)
export class PromoController {
  constructor(private readonly promoService: PromoService) {}

  @Roles([ROLE_LIST.STORE_OWNER])
  @Post('/')
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
}
