import { DataSource } from 'typeorm';
import { ComboQuantityEntity } from '../entities/comboQuantity.entity';

export const ComboQuantityProviders = [
  {
    provide: 'COMBO_QUANTITY_REPOSITORY',
    useFactory: (datasource: DataSource) =>
      datasource.getRepository(ComboQuantityEntity),
    inject: ['DATA_SOURCE'],
  },
];
