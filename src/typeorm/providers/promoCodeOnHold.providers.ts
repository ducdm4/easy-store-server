import { DataSource } from 'typeorm';
import { PromoCodeOnHoleEntity } from '../entities/promoCodeOnHold.entity';

export const PromoCodeOnHoldProviders = [
  {
    provide: 'PROMO_CODE_ON_HOLD_REPOSITORY',
    useFactory: (datasource: DataSource) =>
      datasource.getRepository(PromoCodeOnHoleEntity),
    inject: ['DATA_SOURCE'],
  },
];
