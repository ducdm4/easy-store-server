import { Inject, Injectable } from '@nestjs/common';
import { LessThanOrEqual, MoreThan, Repository } from 'typeorm';
import { KeyValue, TRANSACTIONS_TYPE } from 'src/common/constant';
import { MoneyBalanceDailyEntity } from '../typeorm/entities/moneyBalanceDaily.entity';
import { CreateMoneyInBalanceDto } from './dto/moneyTransactions.dto';
import * as moment from 'moment';

@Injectable()
export class MoneyBalanceDailyService {
  constructor(
    @Inject('MONEY_BALANCE_DAILY_REPOSITORY')
    private moneyBalanceDailyRepository: Repository<MoneyBalanceDailyEntity>,
  ) {}

  async upsertByDate(data: CreateMoneyInBalanceDto) {
    const lastRecord = await this.moneyBalanceDailyRepository.findOne({
      where: {
        store: {
          id: data.store.id,
        },
        date: LessThanOrEqual(new Date(data.date)),
      },
      order: {
        id: 'DESC',
      },
    });
    const baseData = {
      balance: data.amount,
      store: {
        id: data.store.id,
      },
      date: new Date(data.date),
    };
    if (!lastRecord) {
      const dataToSave = this.moneyBalanceDailyRepository.create(baseData);
      await this.moneyBalanceDailyRepository.save(dataToSave);
    } else {
      baseData.balance = parseFloat(
        (
          parseFloat(lastRecord.balance.toString()) +
          data.amount * (data.type === TRANSACTIONS_TYPE.IMPORT ? 1 : -1)
        ).toFixed(2),
      );
      if (
        moment(new Date(lastRecord.date)).format('YYYY-MM-DD') !==
        moment(new Date(data.date)).format('YYYY-MM-DD')
      ) {
        const dataToSave = this.moneyBalanceDailyRepository.create(baseData);
        await this.moneyBalanceDailyRepository.save(dataToSave);
      } else {
        lastRecord.balance = baseData.balance;
        await this.moneyBalanceDailyRepository.save(lastRecord);
      }
    }
    await this.updateQuantityForDays(
      {
        store: {
          id: data.store.id,
        },
        date: MoreThan(new Date(data.date)),
      },
      data.type,
      data.amount,
    );
  }

  async updateQuantityForDays(
    condition: KeyValue = {},
    type: TRANSACTIONS_TYPE,
    amount: number,
    addType: 'add' | 'delete' = 'add',
  ) {
    const records = await this.moneyBalanceDailyRepository.find({
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
      record.balance = parseFloat(
        (parseFloat(record.balance.toString()) + amount * sign).toFixed(2),
      );
    });
    this.moneyBalanceDailyRepository.save(records);
  }

  async getMoneyBalance(id: number, date = '') {
    const whereOption = {
      store: {
        id,
      },
    } as KeyValue;
    if (date) {
      whereOption.date = LessThanOrEqual(new Date(date));
    }
    const lastRecord = await this.moneyBalanceDailyRepository.findOne({
      where: whereOption,
      order: {
        date: 'DESC',
      },
    });
    return lastRecord;
  }
}
