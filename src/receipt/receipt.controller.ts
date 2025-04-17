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
}
