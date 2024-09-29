import { DataSource } from 'typeorm';
import { PackageTrackingEntity } from '../entities/packageTracking.entity';

export const PackageTrackingProviders = [
  {
    provide: 'PACKAGE_TRACKING_REPOSITORY',
    useFactory: (datasource: DataSource) =>
      datasource.getRepository(PackageTrackingEntity),
    inject: ['DATA_SOURCE'],
  },
];
