import { DataSource } from 'typeorm';
import { PackagesEntity } from '../entities/package.entity';

export const PackagesProviders = [
  {
    provide: 'PACKAGES_REPOSITORY',
    useFactory: (datasource: DataSource) =>
      datasource.getRepository(PackagesEntity),
    inject: ['DATA_SOURCE'],
  },
];
