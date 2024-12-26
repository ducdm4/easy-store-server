import {
  BadRequestException,
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
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePackageDto, UpdatePackageDto } from './dto/packages.dto';
import { Response, Request } from 'express';
import { PackagesService } from './packages.service';
import { Roles } from '../common/decorator/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { KeyValue, ROLE_LIST } from '../common/constant';
import { getFilterObject, getStoreListForCheck } from 'src/common/function';
import { UserLoggedInDto } from 'src/user/dto/user.dto';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { RolesGuard } from 'src/common/guard/roles.guard';

@Controller('packages')
@UseInterceptors(ClassSerializerInterceptor)
export class PackagesController {
  constructor(private readonly packageService: PackagesService) {}

  @Roles([ROLE_LIST.STORE_OWNER])
  @Post('/')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseFilters(new HttpExceptionFilter())
  async addPackage(
    @Body() createPackageData: CreatePackageDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = req.user as UserLoggedInDto;
      const newPackage = await this.packageService.createNewPackage(
        createPackageData,
        user.storeList,
      );
      res.status(HttpStatus.OK).json({ data: newPackage });
    } catch (e) {
      throw e;
    }
  }

  @Roles([ROLE_LIST.STORE_OWNER, ROLE_LIST.STORE_SALE])
  @Get('/')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseFilters(new HttpExceptionFilter())
  async getListPackageFiltered(@Req() req: Request, @Res() res: Response) {
    try {
      const user = req.user as UserLoggedInDto;
      const filterOption = getFilterObject(req);
      const storeList = getStoreListForCheck(user);
      const packageList = await this.packageService.getListPackage(
        req.query['storeId'].toString(),
        storeList,
        filterOption,
      );
      res.status(HttpStatus.OK).json({ data: packageList });
    } catch (e) {
      throw e;
    }
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Get('/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseFilters(new HttpExceptionFilter())
  async getPackageInfo(
    @Param() params: { id: number },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = req.user as UserLoggedInDto;
      const packageInfo = await this.packageService.getPackageById(
        params.id,
        user.storeList,
      );
      res.status(HttpStatus.OK).json({ data: packageInfo });
    } catch (e) {
      throw e;
    }
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Put('/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseFilters(new HttpExceptionFilter())
  async updatePackageInfo(
    @Param() params: { id: string },
    @Body() updatePackageData: UpdatePackageDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    if (parseInt(params.id) !== updatePackageData.id) {
      throw new BadRequestException('Invalid request');
    }
    try {
      const user = req.user as UserLoggedInDto;
      const packageInfo = await this.packageService.updatePackageInfo(
        updatePackageData,
        user.storeList,
      );
      res.status(HttpStatus.OK).json({ data: packageInfo });
    } catch (e) {
      throw e;
    }
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Patch('/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseFilters(new HttpExceptionFilter())
  async updatePackageStatus(
    @Param() params: { id: string },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = req.user as UserLoggedInDto;
      const packageInfo = await this.packageService.updatePackageStatus(
        parseInt(params.id),
        user.storeList,
      );
      res.status(HttpStatus.OK).json({ data: packageInfo });
    } catch (e) {
      throw e;
    }
  }
  @Roles([ROLE_LIST.STORE_OWNER])
  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseFilters(new HttpExceptionFilter())
  async deletePackage(
    @Param() params: { id: string },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = req.user as UserLoggedInDto;
      const packageInfo = await this.packageService.deletePackage(
        parseInt(params.id),
        user.storeList,
      );
      res.status(HttpStatus.OK).json({ data: packageInfo });
    } catch (e) {
      throw e;
    }
  }
}
