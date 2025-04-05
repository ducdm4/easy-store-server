import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateComboDto, UpdateComboDto } from './dto/combo.dto';
import { ComboEntity } from '../typeorm/entities/combo.entity';
import { dataSource } from '../database/database.providers';
import { StoresService } from '../store/stores.service';
import { SearchInterface } from 'src/common/interface/search.interface';
import { ComboQuantityEntity } from 'src/typeorm/entities/comboQuantity.entity';
import { ProductEntity } from 'src/typeorm/entities/product.entity';
import { PhotoEntity } from 'src/typeorm/entities/photo.entity';
import { ComboProductToppingEntity } from 'src/typeorm/entities/comboProductTopping.entity';

@Injectable()
export class ComboService {
  constructor(
    @Inject('COMBO_REPOSITORY')
    private comboRepository: Repository<ComboEntity>,
    @Inject('COMBO_QUANTITY_REPOSITORY')
    private comboQuantityRepository: Repository<ComboQuantityEntity>,
    private storesService: StoresService,
  ) {}

  async createNewCombo(data: CreateComboDto, storeList: Array<{ id: string }>) {
    const storeCheck = await this.storesService.checkStoreOwner(
      storeList,
      data.store.id.toString(),
    );
    if (storeCheck) {
      const combo = this.comboRepository.create({
        name: data.name,
        description: data.description,
        image: data.image ? { id: data.image.id } : null,
        store: { id: data.store.id },
        comboQuantity: data.comboQuantity,
        price: data.price ? parseFloat(data.price) : 0,
        commissionRate: data.commissionRate
          ? parseFloat(data.commissionRate)
          : null,
        commissionType: data.commissionType,
        originalPrice: data.originalPrice ? parseFloat(data.originalPrice) : 0,
      });
      await this.comboRepository.save(combo);
      return combo;
    }
  }

  async getListCombo(
    storeId: string,
    storeList: Array<{ id: string }>,
    findOptions: SearchInterface,
  ) {
    const storeCheck = await this.storesService.checkStoreOwner(
      storeList,
      storeId,
    );
    if (storeCheck) {
      const comboQuery = dataSource
        .createQueryBuilder()
        .select([
          'combo.id',
          'combo.name',
          'combo.description',
          'combo.isActive',
          'combo.price',
          'combo.originalPrice',
        ])
        .from(ComboEntity, 'combo')
        .innerJoinAndMapMany(
          'combo.comboQuantity',
          ComboQuantityEntity,
          'comboQuantity',
          'combo.id = comboQuantity.comboId',
        )
        .leftJoinAndMapOne(
          'comboQuantity.productUsed',
          ProductEntity,
          'productCombo',
          'comboQuantity.productUsedId = productCombo.id',
        )
        .leftJoinAndMapMany(
          'comboQuantity.toppingQuantity',
          ComboProductToppingEntity,
          'toppingQuantity',
          'comboQuantity.id = toppingQuantity.comboQuantityId',
        )
        .leftJoinAndMapOne(
          'toppingQuantity.product',
          ProductEntity,
          'productToppingUsed',
          'toppingQuantity.productId = productToppingUsed.id',
        )
        .leftJoinAndSelect('combo.image', 'photo')
        .leftJoinAndSelect('productCombo.toppingCategory', 'toppingCategory')
        .leftJoinAndSelect(
          'productToppingUsed.image',
          'productToppingUsedImage',
        )
        .leftJoinAndSelect('productCombo.image', 'image')
        .where('combo.storeId = :storeId', { storeId });
      if (findOptions.paging.page !== 0) {
        comboQuery.skip(
          (findOptions.paging.page - 1) * findOptions.paging.size,
        );
        comboQuery.take(findOptions.paging.size);
      }
      if (findOptions.sort.length) {
        findOptions.sort.forEach((sort) => {
          if (sort.key === 'name') {
            comboQuery.orderBy('combo.name', sort.value);
          } else if (sort.key === 'price') {
            comboQuery.orderBy('combo.price', sort.value);
          }
        });
      }
      if (findOptions.keyword) {
        comboQuery.andWhere((qb) => {
          const subKeyword1 = qb
            .subQuery()
            .select('combo3.id')
            .from(ComboEntity, 'combo3')
            .where('combo3.name LIKE :keyword', {
              keyword: '%' + findOptions.keyword + '%',
            })
            .getQuery();
          const subKeyword2 = qb
            .subQuery()
            .select('product.id')
            .from(ProductEntity, 'product')
            .where('product.name LIKE :keyword2', {
              keyword2: '%' + findOptions.keyword + '%',
            })
            .getQuery();
          const result = `combo.id IN ${subKeyword1} OR comboQuantity.productUsedId IN ${subKeyword2}`;
          return result;
        });
      }
      if (findOptions.filter.length) {
        findOptions.filter.forEach(async (fil) => {
          if (fil.key === 'product') {
            comboQuery.andWhere((qb) => {
              const sub = qb
                .subQuery()
                .select('combo2.id')
                .from(ComboEntity, 'combo2')
                .innerJoin(
                  ComboQuantityEntity,
                  'comboQuantity2',
                  'combo2.id = comboQuantity2.comboId',
                )
                .where('combo2.storeId = :storeId', { storeId })
                .andWhere('comboQuantity2.productUsed IN (:productUsed)', {
                  productUsed: fil.value,
                })
                .getQuery();
              return 'combo.id IN ' + sub;
            });
          }
          if (fil.key === 'active') {
            comboQuery.andWhere('combo.isActive = :active', {
              active: fil.value,
            });
          }
        });
      }
      const data = await comboQuery.getManyAndCount();
      return {
        list: data[0],
        total: data[1],
        page: findOptions.paging.page,
      };
    }
  }

  async getComboById(id: number, storeList: Array<{ id: string }>) {
    const combo = await this.comboRepository.findOne({
      relations: {
        store: true,
        comboQuantity: {
          productUsed: {
            image: true,
          },
          toppingQuantity: {
            product: {
              image: true,
            },
          },
        },
        image: true,
      },
      where: {
        id,
      },
    });
    if (combo) {
      const storeCheck = await this.storesService.checkStoreOwner(
        storeList,
        combo.store.id.toString(),
      );
      if (storeCheck) {
        return combo;
      }
    } else {
      throw new NotFoundException('Combo not found');
    }
  }

  async updateComboInfo(
    data: UpdateComboDto,
    storeList: Array<{ id: string }>,
  ) {
    const combo = await this.comboRepository.findOne({
      relations: {
        comboQuantity: {
          productUsed: true,
          toppingQuantity: {
            product: true,
          },
        },
        store: true,
        image: true,
      },
      where: {
        id: data.id,
      },
    });
    if (combo) {
      const storeCheck = await this.storesService.checkStoreOwner(
        storeList,
        combo.store.id.toString(),
      );
      if (storeCheck) {
        const newCombo = {
          ...combo,
          ...data,
          price: data.price ? parseFloat(data.price) : 0,
          commissionRate: data.commissionRate
            ? parseFloat(data.commissionRate)
            : null,
          originalPrice: data.originalPrice
            ? parseFloat(data.originalPrice)
            : 0,
        };

        if (!newCombo.image || !newCombo.image.id) {
          newCombo.image = null;
        }
        await this.comboRepository.save(newCombo);
        return newCombo;
      }
    } else {
      throw new NotFoundException('Combo not found');
    }
  }

  async updateComboStatus(id: number, storeList: Array<{ id: string }>) {
    const combo = await this.comboRepository.findOne({
      relations: {
        store: true,
      },
      where: {
        id,
      },
    });
    if (!combo) {
      throw new NotFoundException('Combo not found');
    } else {
      const storeCheck = await this.storesService.checkStoreOwner(
        storeList,
        combo.store.id.toString(),
      );
      if (storeCheck) {
        const newCombo = {
          ...combo,
          isActive: !combo.isActive,
        };
        await this.comboRepository.save(newCombo);
        return newCombo;
      }
    }
  }

  async deleteCombo(id: number, storeList: Array<{ id: string }>) {
    const combo = await this.comboRepository.findOne({
      relations: {
        store: true,
        image: true,
        comboQuantity: {
          toppingQuantity: true,
        },
      },
      where: {
        id,
      },
    });
    if (!combo) {
      throw new NotFoundException('Combo not found');
    } else {
      const storeCheck = await this.storesService.checkStoreOwner(
        storeList,
        combo.store.id.toString(),
      );
      if (storeCheck) {
        await this.comboRepository.softRemove(combo);
        return true;
      }
    }
  }

  async getAllByStoreId(storeId: number, storeList: Array<{ id: string }>) {
    const storeCheck = await this.storesService.checkStoreOwner(
      storeList,
      storeId.toString(),
    );
    if (storeCheck) {
      const combo = await this.comboRepository.find({
        relations: {
          store: true,
          image: true,
        },
        where: {
          store: {
            id: storeId,
          },
          isActive: true,
        },
      });
      return combo;
    }
  }
}
