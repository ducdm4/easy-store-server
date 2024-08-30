import { DataSource } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';

export const ProductProviders = [
  {
    provide: 'PRODUCT_REPOSITORY',
    useFactory: (datasource: DataSource) =>
      datasource.getRepository(ProductEntity),
    inject: ['DATA_SOURCE'],
  },
];
