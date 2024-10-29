import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ProductTransactionsService } from './productTransactions.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorator/roles.decorator';
import { ROLE_LIST } from 'src/common/constant';
import { UserLoggedInDto } from 'src/user/dto/user.dto';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { CreateTransactionsDto } from './productTransactions.dto';

@Controller('product-transactions')
export class ProductTransactionsController {
  constructor(
    private readonly transactionsService: ProductTransactionsService,
  ) {}

  @Roles([ROLE_LIST.STORE_OWNER])
  @Post('/')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseFilters(new HttpExceptionFilter())
  async createNewTransaction(
    @Body() data: CreateTransactionsDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = req.user as UserLoggedInDto;
      const transaction = await this.transactionsService.createNewTransaction(
        data,
        user.storeList,
      );

      res.status(HttpStatus.OK).json({ data: transaction });
    } catch (e) {
      throw e;
    }
  }
}
