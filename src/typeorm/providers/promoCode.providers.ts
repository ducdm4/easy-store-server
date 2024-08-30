import { DataSource } from 'typeorm';
import { PromoCodeEntity } from '../entities/promoCode.entity';

export const PromoCodeProviders = [
  {
    provide: 'PROMO_CODE_REPOSITORY',
    useFactory: (datasource: DataSource) =>
      datasource.getRepository(PromoCodeEntity),
    inject: ['DATA_SOURCE'],
  },
];
