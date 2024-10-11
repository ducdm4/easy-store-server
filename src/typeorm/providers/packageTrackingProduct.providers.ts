import { DataSource } from 'typeorm';
import { PackageTrackingProductEntity } from '../entities/packageTrackingProduct.entity';

export const PackageTrackingProductProviders = [
  {
    provide: 'PACKAGE_TRACKING_PRODUCT_REPOSITORY',
    useFactory: (datasource: DataSource) =>
      datasource.getRepository(PackageTrackingProductEntity),
    inject: ['DATA_SOURCE'],
  },
];
