import { Inject, Injectable } from '@nestjs/common';
import {
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { KeyValue, TRANSACTIONS_TYPE } from 'src/common/constant';
import { ProductInStockDailyEntity } from '../typeorm/entities/productInStockDaily.entity';
import { dataSource } from '../database/database.providers';
import { CreateProductInStockDto } from './dto/productInStockDaily.dto';
import * as moment from 'moment';

@Injectable()
export class ProductInStockDailyService {
  constructor(
    @Inject('PRODUCT_IN_STOCK_DAILY_REPOSITORY')
    private productInStockDailyRepository: Repository<ProductInStockDailyEntity>,
  ) {}

  async upsertByDate(data: CreateProductInStockDto) {
    const lastRecord = await this.productInStockDailyRepository.findOne({
      where: {
        product: {
          id: data.product.id,
        },
        date: LessThanOrEqual(new Date(data.date)),
      },
      order: {
        date: 'DESC',
      },
    });
    const baseData = {
      quantity: data.quantity,
      product: {
        id: data.product.id,
      },
      date: new Date(data.date),
    };
    if (!lastRecord) {
      const dataToSave = this.productInStockDailyRepository.create(baseData);
      await this.productInStockDailyRepository.save(dataToSave);
    } else {
      baseData.quantity = parseFloat(
        (
          parseFloat(lastRecord.quantity.toString()) +
          data.quantity * (data.type === TRANSACTIONS_TYPE.IMPORT ? 1 : -1)
        ).toFixed(2),
      );
      if (
        moment(new Date(lastRecord.date)).format('YYYY-MM-DD') !==
        moment(new Date(data.date)).format('YYYY-MM-DD')
      ) {
        const dataToSave = this.productInStockDailyRepository.create(baseData);
        await this.productInStockDailyRepository.save(dataToSave);
      } else {
        lastRecord.quantity = baseData.quantity;
        await this.productInStockDailyRepository.save(lastRecord);
      }
    }
    await this.updateQuantityForDays(
      {
        product: {
          id: data.product.id,
        },
        date: MoreThan(new Date(data.date)),
      },
      data.type,
      data.quantity,
    );
  }

  async updateQuantityForDays(
    condition: KeyValue = {},
    type: TRANSACTIONS_TYPE,
    quantity: number,
    addType: 'add' | 'delete' = 'add',
  ) {
    const records = await this.productInStockDailyRepository.find({
      where: condition,
      order: {
        date: 'ASC',
      },
    });
    records.forEach((record) => {
      let sign = 1;
      if (addType === 'add') {
        sign = type === TRANSACTIONS_TYPE.IMPORT ? 1 : -1;
      } else {
        sign = type === TRANSACTIONS_TYPE.IMPORT ? -1 : 1;
      }
      record.quantity = parseFloat(
        (parseFloat(record.quantity.toString()) + quantity * sign).toFixed(2),
      );
    });
    this.productInStockDailyRepository.save(records);
  }

  async getInStockForProduct(id: number, date = '') {
    const whereOption = {
      product: {
        id,
      },
    } as KeyValue;
    if (date) {
      whereOption.date = LessThanOrEqual(new Date(date));
    }
    const lastRecord = await this.productInStockDailyRepository.findOne({
      where: whereOption,
      order: {
        date: 'DESC',
      },
    });
    return lastRecord;
  }
}
