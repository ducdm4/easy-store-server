import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { Response, Request } from 'express';
import { ProductService } from './product.service';
import { Roles } from '../common/decorator/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { KeyValue, ROLE_LIST } from '../common/constant';
import { getFilterObject } from 'src/common/function';
import { UserLoggedInDto } from 'src/user/dto/user.dto';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';

@Controller('products')
@UseInterceptors(ClassSerializerInterceptor)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Roles([ROLE_LIST.STORE_OWNER])
  @Post('')
  @UseGuards(AuthGuard('jwt'))
  @UseFilters(new HttpExceptionFilter())
  async addNewProduct(
    @Body() createProductData: CreateProductDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = req.user as UserLoggedInDto;
      const product = await this.productService.addNewProduct(
        createProductData,
        user.storeList,
      );
      res.status(HttpStatus.OK).json({ data: product });
    } catch (e) {
      throw e;
    }
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  @UseFilters(new HttpExceptionFilter())
  async getListProductFiltered(@Req() req: Request, @Res() res: Response) {
    try {
      const user = req.user as UserLoggedInDto;
      const filterOption = getFilterObject(req);
      const productList = await this.productService.getListProduct(
        req.query['storeId'].toString(),
        user.storeList,
        filterOption,
      );
      res.status(HttpStatus.OK).json({ data: productList });
    } catch (e) {
      throw e;
    }
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Get('/:storeId/:id')
  @UseFilters(new HttpExceptionFilter())
  @UseGuards(AuthGuard('jwt'))
  async getProductInfo(
    @Param() params: KeyValue,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = req.user as UserLoggedInDto;
      const product = await this.productService.getProductById(
        params.id,
        params.storeId,
        user.storeList,
      );
      res.status(HttpStatus.OK).json({ data: product });
    } catch (e) {
      throw e;
    }
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Put('/:storeId/:id')
  @UseGuards(AuthGuard('jwt'))
  @UseFilters(new HttpExceptionFilter())
  async updateProductInfo(
    @Body() data: UpdateProductDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = req.user as UserLoggedInDto;
      const product = await this.productService.updateProduct(
        data,
        user.storeList,
      );
      res.status(HttpStatus.OK).json({ data: product });
    } catch (e) {
      throw e;
    }
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Delete('/:storeId/:id')
  @UseGuards(AuthGuard('jwt'))
  @UseFilters(new HttpExceptionFilter())
  async deleteProductInfo(
    @Param() params: { id: number; storeId: number },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = req.user as UserLoggedInDto;
      const product = await this.productService.deleteProductById(
        params.id,
        params.storeId,
        user.storeList,
      );
      res.status(HttpStatus.OK).json({ data: product });
    } catch (e) {
      throw e;
    }
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Get('/topping/list/:storeId')
  @UseGuards(AuthGuard('jwt'))
  @UseFilters(new HttpExceptionFilter())
  async getStoreToppingList(
    @Param() params: { storeId: number },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = req.user as UserLoggedInDto;
      const toppingList = await this.productService.getToppingList(
        params.storeId,
        user.storeList,
      );
      res.status(HttpStatus.OK).json({ data: toppingList });
    } catch (e) {
      throw e;
    }
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Get('/list/all/:storeId')
  @UseGuards(AuthGuard('jwt'))
  @UseFilters(new HttpExceptionFilter())
  async getAllStoreProduct(
    @Param() params: { storeId: number },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = req.user as UserLoggedInDto;
      const productList = await this.productService.getAllProduct(
        params.storeId,
        user.storeList,
      );
      res.status(HttpStatus.OK).json({ data: productList });
    } catch (e) {
      throw e;
    }
  }
}
