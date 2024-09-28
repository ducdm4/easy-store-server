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
import { CreateEmployeeDto } from './dto/employee.dto';
import { Response, Request } from 'express';
import { EmployeeService } from './employee.service';
import { Roles } from '../common/decorator/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { KeyValue, ROLE_LIST } from '../common/constant';
import { getFilterObject } from 'src/common/function';

@Controller('employee')
@UseInterceptors(ClassSerializerInterceptor)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Roles([ROLE_LIST.STORE_OWNER])
  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  async addEmployee(
    @Body() createEmployeeData: CreateEmployeeDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = req.user as { id: number; storeList: Array<{ id: string }> };
    console.log('createEmployeeData', createEmployeeData);
    const employee = await this.employeeService.addNewEmployee(
      createEmployeeData,
      user,
    );
    res.status(HttpStatus.OK).json({ data: employee });
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  async getListEmployeeFiltered(@Req() req: Request, @Res() res: Response) {
    const user = req.user as { id: number; storeList: Array<{ id: string }> };
    const filterOption = getFilterObject(req);
    const employee = await this.employeeService.getListEmployee(
      req.query['storeId'].toString(),
      user.storeList,
      filterOption,
    );
    res.status(HttpStatus.OK).json({ data: employee });
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  async getEmployeeDetail(@Req() req: Request, @Res() res: Response) {
    const user = req.user as { id: number; storeList: Array<{ id: string }> };
    const employee = await this.employeeService.getEmployeeDetail(
      req.params.id,
      user.storeList,
    );
    res.status(HttpStatus.OK).json({ data: employee });
  }
}
