import { DataSource } from 'typeorm';
import { ProductTransactionsEntity } from '../entities/productTransactions.entity';

export const ProductTransactionsProviders = [
  {
    provide: 'PRODUCT_TRANSACTIONS_REPOSITORY',
    useFactory: (datasource: DataSource) =>
      datasource.getRepository(ProductTransactionsEntity),
    inject: ['DATA_SOURCE'],
  },
];
