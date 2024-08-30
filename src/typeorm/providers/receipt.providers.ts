import { DataSource } from 'typeorm';
import { ReceiptEntity } from '../entities/receipt.entity';

export const ReceiptProviders = [
  {
    provide: 'RECEIPT_REPOSITORY',
    useFactory: (datasource: DataSource) =>
      datasource.getRepository(ReceiptEntity),
    inject: ['DATA_SOURCE'],
  },
];
