import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { StoresService } from 'src/store/stores.service';
import { ProductService } from 'src/product/product.service';
import { ProductInStockDailyService } from 'src/product/productInStockDaily.service';
import { ProductTransactionsEntity } from 'src/typeorm/entities/productTransactions.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { CreateTransactionsDto } from './productTransactions.dto';
import { SearchInterface } from 'src/common/interface/search.interface';
import { dataSource } from 'src/database/database.providers';
import { ProductEntity } from 'src/typeorm/entities/product.entity';
import * as moment from 'moment';

@Injectable()
export class ProductTransactionsService {
  constructor(
    @Inject('PRODUCT_TRANSACTIONS_REPOSITORY')
    private transactionsRepository: Repository<ProductTransactionsEntity>,
    private storeService: StoresService,
    private productService: ProductService,
    private productInStockDailyService: ProductInStockDailyService,
  ) {}

  async createNewTransaction(
    data: CreateTransactionsDto,
    storeList: Array<{ id: string }>,
  ) {
    const product = await this.productService.getSingleProductForChecking(
      data.product.id,
    );
    if (product) {
      const storeCheck = await this.storeService.checkStoreOwner(
        storeList,
        product.store.id.toString(),
      );
      if (storeCheck) {
        const dataToSave = this.transactionsRepository.create({
          ...data,
          date: new Date(data.date),
        });
        await this.transactionsRepository.save(dataToSave);
        await this.productInStockDailyService.upsertByDate({
          product: {
            id: data.product.id,
          },
          quantity: data.quantity,
          type: data.type,
          date: data.date,
        });
        return dataToSave;
      }
      return '';
    }
    return false;
  }

  async getListTransaction(
    storeId: string,
    storeList: Array<{ id: string }>,
    findOptions: SearchInterface,
  ) {
    const storeCheck = await this.storeService.checkStoreOwner(
      storeList,
      storeId,
    );
    if (storeCheck) {
      const transactionQuery = dataSource
        .createQueryBuilder()
        .select([
          'transaction.id',
          'transaction.reason',
          'transaction.date',
          'transaction.type',
          'transaction.quantity',
          'transaction.product',
          'product.id as prodId',
          'product.name as prodName',
        ])
        .from(ProductTransactionsEntity, 'transaction')
        .innerJoinAndMapOne(
          'transaction.product',
          ProductEntity,
          'product',
          'transaction.productId = product.id',
        )
        .where('product.storeId = :storeId', { storeId })
        .skip((findOptions.paging.page - 1) * findOptions.paging.size)
        .take(findOptions.paging.size);
      if (findOptions.sort.length) {
        findOptions.sort.forEach((sort) => {
          if (sort.key === 'product') {
            transactionQuery.orderBy('product.name', sort.value);
          } else if (sort.key === 'date') {
            transactionQuery.orderBy('transaction.date', sort.value);
          } else if (sort.key === 'quantity') {
            transactionQuery.orderBy('transaction.quantity', sort.value);
          }
        });
      } else {
        transactionQuery.orderBy('transaction.date', 'ASC');
      }
      if (findOptions.keyword) {
        transactionQuery.andWhere(
          `(transaction.reason LIKE :keyword OR product.name LIKE :keyword)`,
          {
            keyword: '%' + findOptions.keyword + '%',
          },
        );
      }

      const date = new Date();
      let startDate = moment(date).subtract(29, 'days').format('YYYY-MM-DD');
      let endDate = moment(date).format('YYYY-MM-DD');
      let filterProduct = [];
      if (findOptions.filter.length) {
        findOptions.filter.forEach(async (fil) => {
          if (fil.key === 'product') {
            filterProduct = fil.value as string[];
            transactionQuery.andWhere('transaction.productId IN (:productId)', {
              productId: fil.value,
            });
          }
          if (fil.key === 'type') {
            transactionQuery.andWhere('transaction.type = :type', {
              type: fil.value,
            });
          } else if (fil.key === 'startDate') {
            startDate = fil.value.toString();
          } else if (fil.key === 'endDate') {
            endDate = fil.value.toString();
          }
        });
      }
      transactionQuery.andWhere(
        '(DATE(transaction.date) >= :startDate AND DATE(transaction.date) <= :endDate)',
        {
          startDate,
          endDate,
        },
      );
      const data = await transactionQuery.getManyAndCount();
      const metadata = {
        startBalance: null,
        endBalance: null,
      };
      if (filterProduct.length === 1) {
        const resStart =
          await this.productInStockDailyService.getInStockForProduct(
            filterProduct[0],
            startDate,
          );
        const resEnd =
          await this.productInStockDailyService.getInStockForProduct(
            filterProduct[0],
            endDate,
          );
        metadata.startBalance = resStart ? resStart.quantity : 0;
        metadata.endBalance = resEnd ? resEnd.quantity : 0;
      }

      return {
        list: data[0],
        total: data[1],
        page: findOptions.paging.page,
        metadata,
      };
    }
  }

  async deleteTransaction(id: number, storeList: Array<{ id: string }>) {
    const transaction = await this.transactionsRepository.findOne({
      relations: {
        product: {
          store: true,
        },
      },
      where: {
        id,
      },
    });
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    } else {
      const storeCheck = await this.storeService.checkStoreOwner(
        storeList,
        transaction.product.store.id.toString(),
      );
      if (storeCheck) {
        const condition = {
          product: {
            id: transaction.product.id,
          },
          date: MoreThanOrEqual(moment(transaction.date).format('YYYY-MM-DD')),
        };
        await this.productInStockDailyService.updateQuantityForDays(
          condition,
          transaction.type,
          transaction.quantity,
          'delete',
        );
        await this.transactionsRepository.softDelete(id);
        return true;
      }
    }
    return false;
  }
}
