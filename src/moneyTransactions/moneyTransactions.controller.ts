import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { MoneyTransactionsService } from './moneyTransactions.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorator/roles.decorator';
import { ROLE_LIST } from 'src/common/constant';
import { UserLoggedInDto } from 'src/user/dto/user.dto';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { CreateTransactionsDto } from './dto/moneyTransactions.dto';
import { getFilterObject } from 'src/common/function';
import moment from 'moment';

@Controller('money-transactions')
export class MoneyTransactionsController {
  constructor(
    private readonly moneyTransactionsService: MoneyTransactionsService,
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
      const transaction =
        await this.moneyTransactionsService.createNewTransaction(
          data,
          user.storeList,
        );

      res.status(HttpStatus.OK).json({ data: transaction });
    } catch (e) {
      throw e;
    }
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Get('/')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseFilters(new HttpExceptionFilter())
  async getListTransactionFiltered(@Req() req: Request, @Res() res: Response) {
    try {
      const user = req.user as UserLoggedInDto;
      const filterOption = getFilterObject(req);
      const transactionsList =
        await this.moneyTransactionsService.getListTransaction(
          req.query['storeId'].toString(),
          user.storeList,
          filterOption,
        );
      res.status(HttpStatus.OK).json({ data: transactionsList });
    } catch (e) {
      throw e;
    }
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Get('/balance/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseFilters(new HttpExceptionFilter())
  async getCurrentBalance(
    @Param() params: { id: number },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = req.user as UserLoggedInDto;
      const balance = await this.moneyTransactionsService.getCurrentBalance(
        params.id,
        user.storeList,
      );
      res.status(HttpStatus.OK).json({ data: balance });
    } catch (e) {
      throw e;
    }
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseFilters(new HttpExceptionFilter())
  async deleteTransaction(
    @Param() data: { id: number },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = req.user as UserLoggedInDto;
      const response = await this.moneyTransactionsService.deleteTransaction(
        data.id,
        user.storeList,
      );
      res.status(HttpStatus.OK).json({ data: response });
    } catch (e) {
      throw e;
    }
  }
}
