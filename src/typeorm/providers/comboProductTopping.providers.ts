import { DataSource } from 'typeorm';
import { ComboProductToppingEntity } from '../entities/comboProductTopping.entity';

export const ComboProductToppingProviders = [
  {
    provide: 'COMBO_PRODUCT_TOPPING_REPOSITORY',
    useFactory: (datasource: DataSource) =>
      datasource.getRepository(ComboProductToppingEntity),
    inject: ['DATA_SOURCE'],
  },
];
