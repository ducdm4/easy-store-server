import { DataSource } from 'typeorm';
import { UnUsedPromoEntity } from '../entities/unUsedPromo.entity';

export const UnUsedPromoProviders = [
  {
    provide: 'UN_USED_PROMO_REPOSITORY',
    useFactory: (datasource: DataSource) =>
      datasource.getRepository(UnUsedPromoEntity),
    inject: ['DATA_SOURCE'],
  },
];
