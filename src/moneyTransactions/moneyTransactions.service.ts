import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { StoresService } from 'src/store/stores.service';
import { MoneyTransactionsEntity } from 'src/typeorm/entities/moneyTransactions.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { CreateTransactionsDto } from './dto/moneyTransactions.dto';
import { SearchInterface } from 'src/common/interface/search.interface';
import { dataSource } from 'src/database/database.providers';
import { MoneyBalanceDailyService } from './moneyBalanceDaily.service';
import * as moment from 'moment';

@Injectable()
export class MoneyTransactionsService {
  constructor(
    @Inject('MONEY_TRANSACTIONS_REPOSITORY')
    private moneyTransactionsRepository: Repository<MoneyTransactionsEntity>,
    private storeService: StoresService,
    private moneyBalanceService: MoneyBalanceDailyService,
  ) {}

  async createNewTransaction(
    data: CreateTransactionsDto,
    storeList: Array<{ id: string }>,
  ) {
    const storeCheck = await this.storeService.checkStoreOwner(
      storeList,
      data.store.id.toString(),
    );
    if (storeCheck) {
      const dataToSave = this.moneyTransactionsRepository.create({
        ...data,
        amount: parseFloat(data.amount),
        date: new Date(data.date),
      });
      await this.moneyTransactionsRepository.save(dataToSave);
      await this.moneyBalanceService.upsertByDate({
        amount: parseFloat(data.amount),
        type: data.type,
        date: data.date,
        store: {
          id: data.store.id,
        },
      });
      return dataToSave;
    }
    return '';
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
          'transaction.amount',
          'transaction.storeId',
        ])
        .from(MoneyTransactionsEntity, 'transaction')
        .where('transaction.storeId = :storeId', { storeId })
        .skip((findOptions.paging.page - 1) * findOptions.paging.size)
        .take(findOptions.paging.size);
      if (findOptions.sort.length) {
        findOptions.sort.forEach((sort) => {
          if (sort.key === 'date') {
            transactionQuery.orderBy('transaction.date', sort.value);
          } else if (sort.key === 'amount') {
            transactionQuery.orderBy('transaction.amount', sort.value);
          }
        });
      } else {
        transactionQuery.orderBy('transaction.date', 'ASC');
      }
      if (findOptions.keyword) {
        transactionQuery.andWhere(`(transaction.reason LIKE :keyword)`, {
          keyword: '%' + findOptions.keyword + '%',
        });
      }

      const date = new Date();
      let startDate = moment(date).subtract(29, 'days').format('YYYY-MM-DD');
      let endDate = moment(date).format('YYYY-MM-DD');
      if (findOptions.filter.length) {
        findOptions.filter.forEach(async (fil) => {
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
      const resStart = await this.moneyBalanceService.getMoneyBalance(
        parseInt(storeId),
        startDate,
      );
      const resEnd = await this.moneyBalanceService.getMoneyBalance(
        parseInt(storeId),
        endDate,
      );
      metadata.startBalance = resStart ? resStart.balance : 0;
      metadata.endBalance = resEnd ? resEnd.balance : 0;

      return {
        list: data[0],
        total: data[1],
        page: findOptions.paging.page,
        metadata,
      };
    }
  }

  async deleteTransaction(id: number, storeList: Array<{ id: string }>) {
    const transaction = await this.moneyTransactionsRepository.findOne({
      relations: {
        store: true,
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
        transaction.store.id.toString(),
      );
      if (storeCheck) {
        const condition = {
          store: {
            id: transaction.store.id,
          },
          date: MoreThanOrEqual(moment(transaction.date).format('YYYY-MM-DD')),
        };
        await this.moneyBalanceService.updateQuantityForDays(
          condition,
          transaction.type,
          transaction.amount,
          'delete',
        );
        await this.moneyTransactionsRepository.softDelete(id);
        return true;
      }
    }
    return false;
  }

  async getCurrentBalance(storeId: number, storeList: Array<{ id: string }>) {
    const storeCheck = await this.storeService.checkStoreOwner(
      storeList,
      storeId.toString(),
    );
    if (storeCheck) {
      const balance = await this.moneyBalanceService.getMoneyBalance(
        storeId,
        moment(new Date()).format('YYYY-MM-DD'),
      );
      return balance.balance || 0;
    }
    return 0;
  }
}
