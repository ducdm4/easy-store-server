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
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { Response, Request } from 'express';
import { ProductService } from './product.service';
import { Roles } from '../common/decorator/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { KeyValue, ROLE_LIST } from '../common/constant';
import { getFilterObject } from 'src/common/function';
import { UserLoggedInDto } from 'src/user/dto/user.dto';

@Controller('products')
@UseInterceptors(ClassSerializerInterceptor)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Roles([ROLE_LIST.STORE_OWNER])
  @Post('')
  @UseGuards(AuthGuard('jwt'))
  async addNewProduct(
    @Body() createProductData: CreateProductDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = req.user as UserLoggedInDto;
    console.log('createEmployeeData', createProductData);
    const product = await this.productService.addNewProduct(
      createProductData,
      user.storeList,
    );
    res.status(HttpStatus.OK).json({ data: product });
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  async getListProductFiltered(@Req() req: Request, @Res() res: Response) {
    const user = req.user as UserLoggedInDto;
    const filterOption = getFilterObject(req);
    const productList = await this.productService.getListProduct(
      req.query['storeId'].toString(),
      user.storeList,
      filterOption,
    );
    res.status(HttpStatus.OK).json({ data: productList });
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Get('/:storeId/:id')
  @UseGuards(AuthGuard('jwt'))
  async getProductInfo(
    @Param() params: KeyValue,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = req.user as UserLoggedInDto;
    const product = await this.productService.getProductById(
      params.id,
      params.storeId,
      user.storeList,
    );
    res.status(HttpStatus.OK).json({ data: product });
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Put('/:storeId/:id')
  @UseGuards(AuthGuard('jwt'))
  async updateProductInfo(
    @Body() data: UpdateProductDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = req.user as UserLoggedInDto;
    const product = await this.productService.updateProduct(
      data,
      user.storeList,
    );
    res.status(HttpStatus.OK).json({ data: product });
  }

  @Roles([ROLE_LIST.STORE_OWNER])
  @Delete('/:storeId/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteProductInfo(
    @Param() params: { id: number; storeId: number },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = req.user as UserLoggedInDto;
    const product = await this.productService.deleteProductById(
      params.id,
      params.storeId,
      user.storeList,
    );
    res.status(HttpStatus.OK).json({ data: product });
  }
}
