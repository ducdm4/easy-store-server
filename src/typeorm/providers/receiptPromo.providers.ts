import { DataSource } from 'typeorm';
import { ReceiptPromoEntity } from '../entities/receiptPromo.entity';

export const ReceiptPromoProviders = [
  {
    provide: 'RECEIPT_PROMO_REPOSITORY',
    useFactory: (datasource: DataSource) =>
      datasource.getRepository(ReceiptPromoEntity),
    inject: ['DATA_SOURCE'],
  },
];
