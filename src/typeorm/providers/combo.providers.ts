import { DataSource } from 'typeorm';
import { ComboEntity } from '../entities/combo.entity';

export const ComboProviders = [
  {
    provide: 'COMBO_REPOSITORY',
    useFactory: (datasource: DataSource) =>
      datasource.getRepository(ComboEntity),
    inject: ['DATA_SOURCE'],
  },
];
