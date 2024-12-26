import { DataSource } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';

export const CategoriesProviders = [
  {
    provide: 'CATEGORY_REPOSITORY',
    useFactory: (datasource: DataSource) =>
      datasource.getRepository(CategoryEntity),
    inject: ['DATA_SOURCE'],
  },
];
