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
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
import { Response, Request } from 'express';
import { CustomerService } from './customer.service';
import { Roles } from '../common/decorator/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ROLE_LIST } from '../common/constant';
import { getFilterObject, getStoreListForCheck } from 'src/common/function';
import { UserLoggedInDto } from 'src/user/dto/user.dto';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { RolesGuard } from 'src/common/guard/roles.guard';

@Controller('customer')
@UseInterceptors(ClassSerializerInterceptor)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Roles([ROLE_LIST.STORE_OWNER, ROLE_LIST.STORE_SALE])
  @Post('/')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseFilters(new HttpExceptionFilter())
  async addCustomer(
    @Body() createComboData: CreateCustomerDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = req.user as UserLoggedInDto;
      const storeList = getStoreListForCheck(user);
      const customer = await this.customerService.createNewCustomer(
        createComboData,
        storeList,
      );
      res.status(HttpStatus.OK).json({ data: customer });
    } catch (e) {
      throw e;
    }
  }

  @Roles([ROLE_LIST.STORE_OWNER, ROLE_LIST.STORE_SALE])
  @Get('/')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseFilters(new HttpExceptionFilter())
  async getListCustomerFiltered(@Req() req: Request, @Res() res: Response) {
    try {
      const user = req.user as UserLoggedInDto;
      const filterOption = getFilterObject(req);
      const storeList = getStoreListForCheck(user);
      const customers = await this.customerService.getListCustomer(
        req.query['storeId'].toString(),
        storeList,
        filterOption,
      );
      res.status(HttpStatus.OK).json({ data: customers });
    } catch (e) {
      throw e;
    }
  }

  // @Roles([ROLE_LIST.STORE_OWNER])
  // @Get('/:id')
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @UseFilters(new HttpExceptionFilter())
  // async getComboInfo(
  //   @Param() params: { id: number },
  //   @Req() req: Request,
  //   @Res() res: Response,
  // ) {
  //   try {
  //     const user = req.user as UserLoggedInDto;
  //     const combo = await this.comboService.getComboById(
  //       params.id,
  //       user.storeList,
  //     );
  //     res.status(HttpStatus.OK).json({ data: combo });
  //   } catch (e) {
  //     throw e;
  //   }
  // }

  @Roles([ROLE_LIST.STORE_OWNER, ROLE_LIST.STORE_SALE])
  @Put('/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseFilters(new HttpExceptionFilter())
  async updateCustomerInfo(
    @Param() params: { id: string },
    @Body() updateCustomerData: UpdateCustomerDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    if (parseInt(params.id) !== updateCustomerData.id) {
      throw new BadRequestException('Invalid request');
    }
    try {
      const user = req.user as UserLoggedInDto;
      const storeList = getStoreListForCheck(user);
      const customer = await this.customerService.updateCustomerInfo(
        updateCustomerData,
        storeList,
      );
      res.status(HttpStatus.OK).json({ data: customer });
    } catch (e) {
      throw e;
    }
  }

  // @Roles([ROLE_LIST.STORE_OWNER])
  // @Patch('/:id')
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @UseFilters(new HttpExceptionFilter())
  // async updateComboStatus(
  //   @Param() params: { id: string },
  //   @Req() req: Request,
  //   @Res() res: Response,
  // ) {
  //   try {
  //     const user = req.user as UserLoggedInDto;
  //     const combo = await this.comboService.updateComboStatus(
  //       parseInt(params.id),
  //       user.storeList,
  //     );
  //     res.status(HttpStatus.OK).json({ data: combo });
  //   } catch (e) {
  //     throw e;
  //   }
  // }

  // @Roles([ROLE_LIST.STORE_OWNER])
  // @Delete('/:id')
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @UseFilters(new HttpExceptionFilter())
  // async deleteCombo(
  //   @Param() params: { id: string },
  //   @Req() req: Request,
  //   @Res() res: Response,
  // ) {
  //   try {
  //     const user = req.user as UserLoggedInDto;
  //     const combo = await this.comboService.deleteCombo(
  //       parseInt(params.id),
  //       user.storeList,
  //     );
  //     res.status(HttpStatus.OK).json({ data: combo });
  //   } catch (e) {
  //     throw e;
  //   }
  // }
}
