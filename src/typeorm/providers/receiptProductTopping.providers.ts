import { DataSource } from 'typeorm';
import { ReceiptProductToppingEntity } from '../entities/receiptProductTopping.entity';

export const ReceiptProductToppingProviders = [
  {
    provide: 'RECEIPT_PRODUCT_TOPPING_REPOSITORY',
    useFactory: (datasource: DataSource) =>
      datasource.getRepository(ReceiptProductToppingEntity),
    inject: ['DATA_SOURCE'],
  },
];
