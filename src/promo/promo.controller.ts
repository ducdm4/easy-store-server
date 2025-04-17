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
import {
  CreatePromoCampaignDto,
  CreatePromoCodeDto,
  UpdatePromoCampaignDto,
  UpdatePromoCodeDto,
} from './dto/promo.dto';
import { Response, Request } from 'express';
import { PromoService } from './promo.service';
import { Roles } from '../common/decorator/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { KeyValue, ROLE_LIST } from '../common/constant';
import { getFilterObject, getStoreListForCheck } from 'src/common/function';
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
  async addPromoCode(
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
  @Post('/campaign')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseFilters(new HttpExceptionFilter())
  async addPromoCampaign(
    @Body() data: CreatePromoCampaignDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = req.user as { id: number; storeList: Array<{ id: string }> };
      const promo = await this.promoService.addNewPromoCampaign(data, user);
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
  @Get('/campaign')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseFilters(new HttpExceptionFilter())
  async getListPromoCampaignFiltered(
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = req.user as UserLoggedInDto;
      const filterOption = getFilterObject(req);
      const list = await this.promoService.getListPromoCampaign(
        req.query['storeId'].toString(),
        user.storeList,
        filterOption,
      );
      res.status(HttpStatus.OK).json({ data: list });
    } catch (e) {
      throw e;
    }
  }

  @Roles([ROLE_LIST.STORE_OWNER, ROLE_LIST.STORE_SALE])
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
      const storeList = getStoreListForCheck(user);
      const code = await this.promoService.getDetailPromoCode(
        params.code,
        storeList,
      );
      res.status(HttpStatus.OK).json({ data: code });
    } catch (e) {
      throw e;
    }
  }

  @Roles([ROLE_LIST.STORE_OWNER, ROLE_LIST.STORE_SALE])
  @Post('/hold-code/:code')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseFilters(new HttpExceptionFilter())
  async holdPromoCode(
    @Param() params: { code: string },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = req.user as UserLoggedInDto;
      const storeList = getStoreListForCheck(user);
      const code = await this.promoService.getDetailPromoCode(
        params.code,
        storeList,
      );
      res.status(HttpStatus.OK).json({ data: code });
    } catch (e) {
      throw e;
    }
  }

  @Roles([ROLE_LIST.STORE_OWNER, ROLE_LIST.STORE_SALE])
  @Get('/campaign/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseFilters(new HttpExceptionFilter())
  async getDetailCampaign(
    @Param() params: { id: number },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = req.user as UserLoggedInDto;
      const storeList = getStoreListForCheck(user);
      const campaign = await this.promoService.getDetailPromoCampaign(
        params.id,
        storeList,
      );
      res.status(HttpStatus.OK).json({ data: campaign });
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

  @Roles([ROLE_LIST.STORE_OWNER])
  @Put('/campaign/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseFilters(new HttpExceptionFilter())
  async updateDetailCampaign(
    @Param() params: { id: number },
    @Body() data: UpdatePromoCampaignDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = req.user as UserLoggedInDto;
      const campaign = await this.promoService.updatePromoCampaign(
        params.id,
        data,
        user.storeList,
      );
      res.status(HttpStatus.OK).json({ data: campaign });
    } catch (e) {
      throw e;
    }
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Delete('/code/:code')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseFilters(new HttpExceptionFilter())
  async deletePromotionCode(
    @Param() params: { code: string },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = req.user as UserLoggedInDto;
      const code = await this.promoService.deletePromotionCode(
        params.code,
        user.storeList,
      );
      res.status(HttpStatus.OK).json({ data: code });
    } catch (e) {
      throw e;
    }
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Delete('/campaign/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseFilters(new HttpExceptionFilter())
  async deletePromotionCampaign(
    @Param() params: { id: number },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = req.user as UserLoggedInDto;
      const campaign = await this.promoService.deletePromotionCampaign(
        params.id,
        user.storeList,
      );
      res.status(HttpStatus.OK).json({ data: campaign });
    } catch (e) {
      throw e;
    }
  }
}
