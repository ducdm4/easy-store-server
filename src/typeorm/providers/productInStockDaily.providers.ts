import { DataSource } from 'typeorm';
import { ProductInStockDailyEntity } from '../entities/productInStockDaily.entity';

export const ProductInStockDailyProviders = [
  {
    provide: 'PRODUCT_IN_STOCK_DAILY_REPOSITORY',
    useFactory: (datasource: DataSource) =>
      datasource.getRepository(ProductInStockDailyEntity),
    inject: ['DATA_SOURCE'],
  },
];
