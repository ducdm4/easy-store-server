import { DataSource } from 'typeorm';
import { SpendEntity } from '../entities/spend.entity';

export const SpendProviders = [
  {
    provide: 'SPEND_REPOSITORY',
    useFactory: (datasource: DataSource) =>
      datasource.getRepository(SpendEntity),
    inject: ['DATA_SOURCE'],
  },
];
