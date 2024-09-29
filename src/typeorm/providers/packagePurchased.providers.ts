import { DataSource } from 'typeorm';
import { PackagePurchasedEntity } from '../entities/packagePurchased.entity';

export const PackagePurchasedProviders = [
  {
    provide: 'PACKAGE_PURCHASED_REPOSITORY',
    useFactory: (datasource: DataSource) =>
      datasource.getRepository(PackagePurchasedEntity),
    inject: ['DATA_SOURCE'],
  },
];
