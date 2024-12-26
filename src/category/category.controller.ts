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
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { Response, Request } from 'express';
import { CategoryService } from './category.service';
import { Roles } from '../common/decorator/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ROLE_LIST } from '../common/constant';
import { getFilterObject, getStoreListForCheck } from 'src/common/function';
import { UserLoggedInDto } from 'src/user/dto/user.dto';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { RolesGuard } from 'src/common/guard/roles.guard';

@Controller('categories')
@UseInterceptors(ClassSerializerInterceptor)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Roles([ROLE_LIST.STORE_OWNER])
  @Post('/')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseFilters(new HttpExceptionFilter())
  async addCategory(
    @Body() createCategoryData: CreateCategoryDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = req.user as UserLoggedInDto;
      const category = await this.categoryService.createNewCategory(
        createCategoryData,
        user.storeList,
      );
      res.status(HttpStatus.OK).json({ data: category });
    } catch (e) {
      throw e;
    }
  }

  @Roles([ROLE_LIST.STORE_OWNER, ROLE_LIST.STORE_SALE])
  @Get('/')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseFilters(new HttpExceptionFilter())
  async getListCategoryFiltered(@Req() req: Request, @Res() res: Response) {
    try {
      const user = req.user as UserLoggedInDto;
      const filterOption = getFilterObject(req);
      const storeList = getStoreListForCheck(user);
      const categoryList = await this.categoryService.getListCategory(
        req.query['storeId'].toString(),
        storeList,
        filterOption,
      );
      res.status(HttpStatus.OK).json({ data: categoryList });
    } catch (e) {
      throw e;
    }
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Put('/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseFilters(new HttpExceptionFilter())
  async updateCategoryInfo(
    @Param() params: { id: string },
    @Body() updateData: UpdateCategoryDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    if (parseInt(params.id) !== updateData.id) {
      throw new BadRequestException('Invalid request');
    }
    try {
      const user = req.user as UserLoggedInDto;
      const category = await this.categoryService.updateCategoryInfo(
        updateData,
        user.storeList,
      );
      res.status(HttpStatus.OK).json({ data: category });
    } catch (e) {
      throw e;
    }
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseFilters(new HttpExceptionFilter())
  async deleteCategory(
    @Param() params: { id: string },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = req.user as UserLoggedInDto;
      const category = await this.categoryService.deleteCategory(
        parseInt(params.id),
        user.storeList,
      );
      res.status(HttpStatus.OK).json({ data: category });
    } catch (e) {
      throw e;
    }
  }
}
