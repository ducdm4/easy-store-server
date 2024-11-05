import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
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
import { getFilterObject } from 'src/common/function';

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

  @Roles([ROLE_LIST.STORE_OWNER])
  @Get('/')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseFilters(new HttpExceptionFilter())
  async getListComboFiltered(@Req() req: Request, @Res() res: Response) {
    try {
      const user = req.user as UserLoggedInDto;
      const filterOption = getFilterObject(req);
      const transactionsList =
        await this.transactionsService.getListTransaction(
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
      const response = await this.transactionsService.deleteTransaction(
        data.id,
        user.storeList,
      );
      res.status(HttpStatus.OK).json({ data: response });
    } catch (e) {
      throw e;
    }
  }
}
