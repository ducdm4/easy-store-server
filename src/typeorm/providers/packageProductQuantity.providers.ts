import { DataSource } from 'typeorm';
import { PackageProductQuantityEntity } from '../entities/packageProductQuantity.entity';

export const PackageProductQuantityProviders = [
  {
    provide: 'PACKAGE_PRODUCT_QUANTITY_REPOSITORY',
    useFactory: (datasource: DataSource) =>
      datasource.getRepository(PackageProductQuantityEntity),
    inject: ['DATA_SOURCE'],
  },
];
