import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { PRODUCT_TYPE } from 'src/common/constant';
import { ProductEntity } from '../typeorm/entities/product.entity';
import { dataSource } from '../database/database.providers';
import { StoresService } from '../store/stores.service';
import { ProductInStockDailyService } from './productInStockDaily.service';
import { SearchInterface } from 'src/common/interface/search.interface';
import { ConfigsService } from 'src/config/configs.service';
import { ProductInStockDailyEntity } from 'src/typeorm/entities/productInStockDaily.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<ProductEntity>,
    private storesService: StoresService,
    private productInStockDailyService: ProductInStockDailyService,
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
        toppingCategory: data.toppingCategory
          ? JSON.stringify(data.toppingCategory)
          : null,
        price: data.price ? parseFloat(data.price) : 0,
        originalPrice: data.originalPrice ? parseFloat(data.originalPrice) : 0,
        commissionRate: data.commissionRate
          ? parseFloat(data.commissionRate)
          : null,
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
      newList = current.value.split('||');
      if (!newList.includes(data[key])) {
        newList.push(data[key]);
      }
    } else {
      newList = [data[key]];
    }

    await this.configService.updateValueByKey(
      key,
      newList.join('||'),
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
        relations: {
          image: true,
        },
        where: {
          store: {
            id: storeId,
          },
          isActive: true,
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
          'product.originalPrice',
          'product.type',
          'product.unit',
          'product.category',
          'product.isActive',
          'product.isStorable',
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
          } else if (sort.key === 'category') {
            productQuery.orderBy('product.category', sort.value);
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
          if (fil.key === 'isSaleable') {
            productQuery.andWhere('product.isSaleable = :isSaleable', {
              isSaleable: fil.value,
            });
          }
          if (fil.key === 'isActive') {
            productQuery.andWhere('product.isActive = :isActive', {
              isActive: fil.value,
            });
          }
        });
      }
      const data = await productQuery.getManyAndCount();
      const result = [];
      for (let i = 0; i < data[0].length; i++) {
        const newData = {
          ...data[0][i],
          inStock: 0,
        };
        if (data[0][i].isStorable) {
          const inStock =
            await this.productInStockDailyService.getInStockForProduct(
              data[0][i].id,
            );
          newData.inStock = inStock
            ? parseFloat(inStock.quantity.toString())
            : 0;
        }
        result.push(newData);
      }
      return {
        list: result,
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
    const inStock = await this.productInStockDailyService.getInStockForProduct(
      id,
    );

    if (storeCheck) {
      return {
        ...product,
        inStock: inStock ? parseFloat(inStock.quantity.toString()) : 0,
      };
    }
    return '';
  }

  async getProductInStock(
    id: number,
    storeId: number,
    storeList: Array<{ id: string }>,
  ) {
    const storeCheck = await this.storesService.checkStoreOwner(
      storeList,
      storeId.toString(),
    );
    const inStock = await this.productInStockDailyService.getInStockForProduct(
      id,
    );

    if (storeCheck) {
      return {
        inStock: inStock ? parseFloat(inStock.quantity.toString()) : 0,
      };
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
      return await this.productRepository.softRemove(product);
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
        toppingCategory: data.toppingCategory
          ? JSON.stringify(data.toppingCategory)
          : null,
        price: data.price ? parseFloat(data.price) : 0,
        originalPrice: data.originalPrice ? parseFloat(data.originalPrice) : 0,
        commissionRate: data.commissionRate
          ? parseFloat(data.commissionRate)
          : null,
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

  async updateProductStatus(id: number, storeList: Array<{ id: string }>) {
    const product = await this.productRepository.findOne({
      relations: {
        store: true,
      },
      where: {
        id,
      },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    } else {
      const storeCheck = await this.storesService.checkStoreOwner(
        storeList,
        product.store.id.toString(),
      );
      if (storeCheck) {
        const newProduct = {
          ...product,
          isActive: !product.isActive,
        };
        await this.productRepository.save(newProduct);
        return newProduct;
      }
    }
  }

  async getSingleProductForChecking(id: number) {
    const product = await this.productRepository.findOne({
      relations: {
        store: true,
      },
      where: {
        id,
      },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
}
