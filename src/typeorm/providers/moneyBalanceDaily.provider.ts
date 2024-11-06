import { DataSource } from 'typeorm';
import { MoneyBalanceDailyEntity } from '../entities/moneyBalanceDaily.entity';

export const MoneyBalanceDailyProviders = [
  {
    provide: 'MONEY_BALANCE_DAILY_REPOSITORY',
    useFactory: (datasource: DataSource) =>
      datasource.getRepository(MoneyBalanceDailyEntity),
    inject: ['DATA_SOURCE'],
  },
];
