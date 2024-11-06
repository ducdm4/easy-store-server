import { DataSource } from 'typeorm';
import { MoneyTransactionsEntity } from '../entities/moneyTransactions.entity';

export const MoneyTransactionsProviders = [
  {
    provide: 'MONEY_TRANSACTIONS_REPOSITORY',
    useFactory: (datasource: DataSource) =>
      datasource.getRepository(MoneyTransactionsEntity),
    inject: ['DATA_SOURCE'],
  },
];
