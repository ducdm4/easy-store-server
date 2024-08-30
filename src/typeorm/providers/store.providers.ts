import { DataSource } from 'typeorm';
import { StoreEntity } from '../entities/store.entity';

export const StoreProviders = [
  {
    provide: 'STORE_REPOSITORY',
    useFactory: (datasource: DataSource) =>
      datasource.getRepository(StoreEntity),
    inject: ['DATA_SOURCE'],
  },
];
