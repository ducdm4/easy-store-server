import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { In, Like, Not, Repository } from 'typeorm';
import { CreatePromoCodeDto, UpdatePromoCodeDto } from './dto/promo.dto';
import { KeyValue, PROMO_CODE_STATUS, PROMO_TYPE } from 'src/common/constant';
import { PromoCodeEntity } from '../typeorm/entities/promoCode.entity';
import { dataSource } from '../database/database.providers';
import { StoresService } from '../store/stores.service';
import { SearchInterface } from 'src/common/interface/search.interface';
import moment from 'moment';
import { ProductEntity } from 'src/typeorm/entities/product.entity';
import { ComboEntity } from 'src/typeorm/entities/combo.entity';
import { PackagesEntity } from 'src/typeorm/entities/package.entity';
import { isArray } from 'class-validator';

@Injectable()
export class PromoService {
  constructor(
    @Inject('PROMO_CODE_REPOSITORY')
    private promoCodeRepository: Repository<PromoCodeEntity>,
    private storesService: StoresService,
  ) {}

  async addNewPromo(
    promoData: CreatePromoCodeDto,
    user: { id: number; storeList: Array<{ id: string }> },
  ) {
    const storeCheck = await this.storesService.checkStoreOwner(
      user.storeList,
      promoData.store.id.toString(),
    );
    if (storeCheck) {
      const promoCheck = await this.promoCodeRepository.findOne({
        where: {
          code: promoData.code,
        },
      });
      if (promoCheck) {
        throw new HttpException(
          'Promo code already exist',
          HttpStatus.BAD_REQUEST,
        );
      }
      const promo = this.promoCodeRepository.create({
        ...promoData,
      });
      if (promo.quantity === 0) {
        promo.quantity = null;
      }
      promo.numbersUsed = 0;
      await this.promoCodeRepository.save(promo);
      return promo;
    }
  }

  async getListPromoCode(
    storeId: string,
    storeList: Array<{ id: string }>,
    findOptions: SearchInterface,
  ) {
    const storeCheck = await this.storesService.checkStoreOwner(
      storeList,
      storeId,
    );
    if (storeCheck) {
      const query = dataSource
        .createQueryBuilder()
        .select([
          'promoCode.id',
          'promoCode.code',
          'promoCode.quantity',
          'promoCode.numbersUsed',
          'promoCode.discountType',
          'promoCode.discountAmount',
          'promoCode.timeStart',
          'promoCode.timeEnd',
          'promoCode.isPaused',
        ])
        .leftJoinAndMapOne(
          'promoCode.product',
          ProductEntity,
          'product',
          'product.id = promoCode.productId',
        )
        .leftJoinAndMapOne(
          'promoCode.combo',
          ComboEntity,
          'combo',
          'combo.id = promoCode.comboId',
        )
        .leftJoinAndMapOne(
          'promoCode.package',
          PackagesEntity,
          'package',
          'package.id = promoCode.packageId',
        )
        .from(PromoCodeEntity, 'promoCode')
        .where('promoCode.storeId = :storeId', { storeId });

      if (findOptions.paging.page) {
        query.skip((findOptions.paging.page - 1) * findOptions.paging.size);
      }
      if (findOptions.paging.size) {
        query.take(findOptions.paging.size);
      }
      query.orderBy('promoCode.timeStart', 'ASC');
      if (findOptions.keyword) {
        query.andWhere(
          `(promoCode.code LIKE :keyword OR product.name LIKE :keyword OR combo.name LIKE :keyword OR package.name LIKE :keyword)`,
          {
            keyword: '%' + findOptions.keyword + '%',
          },
        );
      }

      let isHasFilterStatus = false;
      const date = new Date();
      const isInEffectQuery =
        '(promoCode.timeStart <= :date AND promoCode.timeEnd >= :date AND (promoCode.quantity IS NULL OR promoCode.numbersUsed < promoCode.quantity))';
      if (findOptions.filter.length) {
        findOptions.filter.forEach(async (fil) => {
          if (fil.key === 'status') {
            isHasFilterStatus = true;
            if (isArray(fil.value)) {
              const addedQuery = [];
              fil.value.forEach((val) => {
                if (parseInt(val) === PROMO_CODE_STATUS.NOT_STARTED) {
                  addedQuery.push('(promoCode.timeStart > :date)');
                }
                if (parseInt(val) === PROMO_CODE_STATUS.OCCUPIED) {
                  let string = isInEffectQuery;
                  string += ` AND promoCode.isPaused = false`;
                  addedQuery.push(`(${string})`);
                }
                if (parseInt(val) === PROMO_CODE_STATUS.PAUSED) {
                  let string = isInEffectQuery;
                  string += ` AND promoCode.isPaused = true`;
                  addedQuery.push(`(${string})`);
                }
                if (parseInt(val) === PROMO_CODE_STATUS.ENDED) {
                  addedQuery.push(`promoCode.timeEnd < :date`);
                }
                if (parseInt(val) === PROMO_CODE_STATUS.OUT_OF_STOCK) {
                  let string =
                    'promoCode.timeStart <= :date AND promoCode.timeEnd >= :date';
                  string +=
                    ' AND promoCode.isPaused = false AND promoCode.quantity IS NOT NULL AND promoCode.numbersUsed = promoCode.quantity';
                  addedQuery.push(`(${string})`);
                }
              });

              query.andWhere(`${addedQuery.join(' OR ')}`, {
                date,
              });
            }
          }
        });
      }
      if (!isHasFilterStatus) {
        query.andWhere(`${isInEffectQuery} AND promoCode.isPaused = false`, {
          date,
        });
      }
      const data = await query.getManyAndCount();
      return {
        list: data[0],
        total: data[1],
        page: findOptions.paging.page,
      };
    }
  }

  async getDetailPromoCode(code: string, storeList: Array<{ id: string }>) {
    const selectItem = {
      id: true,
      name: true,
      price: true,
      originalPrice: true,
      image: {
        id: true,
      },
    };
    const promoCode = await this.promoCodeRepository.findOne({
      select: {
        id: true,
        code: true,
        quantity: true,
        description: true,
        itemQuantity: true,
        numbersUsed: true,
        discountType: true,
        discountAmount: true,
        canUseWithOther: true,
        timeStart: true,
        timeEnd: true,
        isPaused: true,
        product: {
          ...selectItem,
          unit: true,
        },
        combo: selectItem,
        package: selectItem,
      },
      where: {
        code,
      },
      relations: {
        product: {
          image: true,
        },
        combo: {
          image: true,
        },
        package: {
          image: true,
        },
        store: true,
      },
    });
    if (!promoCode) {
      throw new NotFoundException('Promo code not found');
    }
    const storeCheck = await this.storesService.checkStoreOwner(
      storeList,
      promoCode.store.id.toString(),
    );
    if (storeCheck) {
      return promoCode;
    }
    return null;
  }

  async updatePromoCode(
    code: string,
    promoData: UpdatePromoCodeDto,
    storeList: Array<{ id: string }>,
  ) {
    const promoInfo = await this.promoCodeRepository.findOne({
      relations: {
        store: true,
      },
      where: {
        code,
      },
    });
    if (!promoInfo) {
      throw new NotFoundException('Promo code not found');
    }
    const storeCheck = await this.storesService.checkStoreOwner(
      storeList,
      promoInfo.store.id.toString(),
    );
    if (storeCheck) {
      if (
        !isNaN(parseInt(`${promoData.quantity}`)) &&
        promoData.quantity < promoInfo.numbersUsed
      ) {
        throw new HttpException(
          'Number of times can use must be greater than or equal to numbers used',
          HttpStatus.BAD_REQUEST,
        );
      }
      const newData = {
        ...promoInfo,
        quantity: promoData.quantity === 0 ? null : promoData.quantity,
        description: promoData.description,
        discountAmount: promoData.discountAmount,
        discountType: promoData.discountType,
        timeStart: promoData.timeStart,
        timeEnd: promoData.timeEnd,
        canUseWithOther: promoData.canUseWithOther,
        itemQuantity: promoData.itemQuantity,
        isPaused: promoData.isPaused,
        product: promoData.product ? promoData.product : null,
        combo: promoData.combo ? promoData.combo : null,
        package: promoData.package ? promoData.package : null,
      };
      await this.promoCodeRepository.save(newData);
      return true;
    }
  }
}
