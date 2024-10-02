import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Req,
  Res,
  Sse,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  CreateEmployeeDto,
  UpdateEmployeeDto,
  UpdateEmployeeInfoDto,
} from './dto/combo.dto';
import { Response, Request } from 'express';
import { ComboService } from './combo.service';
import { Roles } from '../common/decorator/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { KeyValue, ROLE_LIST } from '../common/constant';
import { getFilterObject } from 'src/common/function';
import { UserLoggedInDto } from 'src/user/dto/user.dto';

@Controller('combo')
@UseInterceptors(ClassSerializerInterceptor)
export class ComboController {
  constructor(private readonly comboService: ComboService) {}

  @Roles([ROLE_LIST.STORE_OWNER])
  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  async addEmployee(
    @Body() createEmployeeData: CreateEmployeeDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    // const user = req.user as UserLoggedInDto;
    // console.log('createEmployeeData', createEmployeeData);
    // const employee = await this.employeeService.addNewEmployee(
    //   createEmployeeData,
    //   user,
    // );
    // res.status(HttpStatus.OK).json({ data: employee });
  }
}
