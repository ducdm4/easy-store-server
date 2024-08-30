import { DataSource } from 'typeorm';
import { ReceiptProductEntity } from '../entities/receiptProduct.entity';

export const ReceiptProductProviders = [
  {
    provide: 'RECEIPT_PRODUCT_REPOSITORY',
    useFactory: (datasource: DataSource) =>
      datasource.getRepository(ReceiptProductEntity),
    inject: ['DATA_SOURCE'],
  },
];
