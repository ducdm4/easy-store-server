import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { In, Like, Not, Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { KeyValue, PRODUCT_TYPE } from 'src/common/constant';
import { ProductEntity } from '../typeorm/entities/product.entity';
import { dataSource } from '../database/database.providers';
import { StoresService } from '../store/stores.service';
import { PhotosService } from '../photo/photos.service';
import { SearchInterface } from 'src/common/interface/search.interface';
import { UserLoggedInDto } from 'src/user/dto/user.dto';
import { ConfigsService } from 'src/config/configs.service';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<ProductEntity>,
    private storesService: StoresService,
    private photosService: PhotosService,
    private configService: ConfigsService,
  ) {}

  async addNewProduct(
    data: CreateProductDto,
    storeList: Array<{ id: string }>,
  ) {
    const storeCheck = await this.storesService.checkStoreOwner(
      storeList,
      data.store.id.toString(),
    );
    if (storeCheck) {
      await this.updateProductConfig('unit', data);
      await this.updateProductConfig('category', data);

      if (!data.image?.id) delete data.image;
      const dataToSave = {
        ...data,
        price: parseFloat(data.price),
        commissionRate: parseFloat(data.commissionRate),
      };

      const product = await this.productRepository.save(dataToSave);
      return product;
    }
    return '';
  }

  async updateProductConfig(key: string, data: CreateProductDto) {
    const current = await this.configService.getValueByKey(
      key,
      false,
      data.store.id,
    );

    let newList = [];
    if (current) {
      newList = current.value.split('|');
      if (!newList.includes(data[key])) {
        newList.push(data[key]);
      }
    } else {
      newList = [data[key]];
    }

    const newListAdded = await this.configService.updateValueByKey(
      key,
      newList.join('|'),
      data.store.id,
    );
  }

  async getAllProduct(storeId: number, storeList: Array<{ id: string }>) {
    const storeCheck = this.storesService.checkStoreOwner(
      storeList,
      storeId.toString(),
    );
    if (storeCheck) {
      const productList = await this.productRepository.find({
        where: {
          store: {
            id: storeId,
          },
        },
      });
      return productList;
    }
  }

  async getListProduct(
    storeId: string,
    storeList: Array<{ id: string }>,
    findOptions: SearchInterface,
  ) {
    const storeCheck = await this.storesService.checkStoreOwner(
      storeList,
      storeId,
    );
    if (storeCheck) {
      const productQuery = dataSource
        .createQueryBuilder()
        .select([
          'product.id',
          'product.name',
          'product.price',
          'product.type',
          'product.unit',
          'product.category',
          'image.id',
        ])
        .from(ProductEntity, 'product')
        .leftJoin('product.image', 'image')
        .where('product.storeId = :storeId', { storeId });
      if (findOptions.paging.page !== 0) {
        productQuery.skip(
          (findOptions.paging.page - 1) * findOptions.paging.size,
        );
        productQuery.take(findOptions.paging.size);
      }
      if (findOptions.sort.length) {
        findOptions.sort.forEach((sort) => {
          if (sort.key === 'price') {
            productQuery.orderBy('product.price * 1', sort.value);
          } else {
            productQuery.orderBy(sort.key, sort.value);
          }
        });
      }
      if (findOptions.keyword) {
        productQuery.andWhere(
          `(product.name LIKE :keyword OR product.description LIKE :keyword)`,
          {
            keyword: '%' + findOptions.keyword + '%',
          },
        );
      }
      if (findOptions.filter.length) {
        findOptions.filter.forEach((fil) => {
          if (fil.key === 'category') {
            productQuery.andWhere('product.category IN (:...category)', {
              category: fil.value,
            });
          }
          if (fil.key === 'unit') {
            productQuery.andWhere('product.unit IN (:...unit)', {
              unit: fil.value,
            });
          }
          if (fil.key === 'type') {
            productQuery.andWhere('product.type = :type', {
              type: fil.value,
            });
          }
        });
      }
      const data = await productQuery.getManyAndCount();
      return {
        list: data[0],
        total: data[1],
        page: findOptions.paging.page,
      };
    }
  }

  async getProductById(
    id: number,
    storeId: number,
    storeList: Array<{ id: string }>,
  ) {
    const storeCheck = await this.storesService.checkStoreOwner(
      storeList,
      storeId.toString(),
    );
    const product = await this.productRepository.findOne({
      relations: {
        image: true,
        store: true,
      },
      where: { id },
    });
    if (!product) {
      throw new NotFoundException('Product not exist');
    }

    if (storeCheck) {
      return product;
    }
    return '';
  }

  async deleteProductById(
    id: number,
    storeId: number,
    storeList: Array<{ id: string }>,
  ) {
    const product = await this.productRepository.findOne({
      relations: {
        image: true,
        store: true,
      },
      where: { id },
    });
    if (!product) {
      throw new NotFoundException('Product not exist');
    }
    const storeCheck = this.storesService.checkStoreOwner(
      storeList,
      storeId.toString(),
    );
    if (storeCheck) {
      return await this.productRepository.softDelete(product.id);
    }
    return '';
  }

  async updateProduct(
    data: UpdateProductDto,
    storeList: Array<{ id: string }>,
  ) {
    const product = await this.productRepository.findOne({
      relations: {
        image: true,
      },
      where: { id: data.id },
    });
    if (!product) {
      throw new NotFoundException('Product not exist');
    }
    const storeCheck = this.storesService.checkStoreOwner(
      storeList,
      data.store.id.toString(),
    );
    if (storeCheck) {
      await this.updateProductConfig('unit', data);
      await this.updateProductConfig('category', data);

      if (!data.image?.id) delete data.image;
      const dataToSave = {
        ...data,
        price: parseFloat(data.price),
        commissionRate: parseFloat(data.commissionRate),
      };
      await this.productRepository.save(dataToSave);
      return true;
    }
    return '';
  }

  async getToppingList(storeId: number, storeList: Array<{ id: string }>) {
    const storeCheck = this.storesService.checkStoreOwner(
      storeList,
      storeId.toString(),
    );
    if (storeCheck) {
      const toppingList = await this.productRepository.find({
        relations: {
          image: true,
        },
        where: {
          type: PRODUCT_TYPE.TOPPING,
          store: {
            id: storeId,
          },
          isActive: true,
        },
      });
      return toppingList;
    }
    return '';
  }
}
