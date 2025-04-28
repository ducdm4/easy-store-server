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
import { Response, Request } from 'express';
import { ReceiptService } from './receipt.service';
import { Roles } from '../common/decorator/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { KeyValue, ROLE_LIST } from '../common/constant';
import { CreateReceiptDto } from './dto/receipt.dto';
import { getFilterObject, getStoreListForCheck } from 'src/common/function';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { UserLoggedInDto } from 'src/user/dto/user.dto';

@Controller('receipt')
@UseInterceptors(ClassSerializerInterceptor)
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {}

  @Roles([ROLE_LIST.STORE_OWNER, ROLE_LIST.STORE_SALE])
  @Post('/')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseFilters(new HttpExceptionFilter())
  async saveReceipt(
    @Body() data: CreateReceiptDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = req.user as UserLoggedInDto;
      const storeList = getStoreListForCheck(user);
      const receipt = await this.receiptService.saveNewReceipt(data, storeList);
      res.status(HttpStatus.OK).json({ data: receipt });
    } catch (e) {
      throw e;
    }
  }

  @Roles([ROLE_LIST.STORE_OWNER, ROLE_LIST.STORE_SALE])
  @Get('/')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseFilters(new HttpExceptionFilter())
  async getListReceiptFiltered(@Req() req: Request, @Res() res: Response) {
    try {
      const user = req.user as UserLoggedInDto;
      const storeList = getStoreListForCheck(user);
      const filterOption = getFilterObject(req);
      const list = await this.receiptService.getListReceiptFiltered(
        req.query['storeId'].toString(),
        storeList,
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
  async getReceiptByCode(
    @Param() params: { code: string },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = req.user as UserLoggedInDto;
      const storeList = getStoreListForCheck(user);
      const list = await this.receiptService.getReceiptByCodeAndStore(
        params.code,
        storeList,
      );
      res.status(HttpStatus.OK).json({ data: list });
    } catch (e) {
      throw e;
    }
  }

  @Roles([ROLE_LIST.STORE_OWNER, ROLE_LIST.STORE_SALE])
  @Delete('/code/:code/package-purchased/:packagePurchaseId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseFilters(new HttpExceptionFilter())
  async deletePackagePurchased(
    @Param() params: { code: string; packagePurchaseId: number },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = req.user as UserLoggedInDto;
      const storeList = getStoreListForCheck(user);
      const list = await this.receiptService.deletePackagePurchased(
        params.code,
        params.packagePurchaseId,
        storeList,
      );
      res.status(HttpStatus.OK).json({ data: list });
    } catch (e) {
      throw e;
    }
  }
}
