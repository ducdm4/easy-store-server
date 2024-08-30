import { DataSource } from 'typeorm';
import { ComboTrackingEntity } from '../entities/comboTracking.entity';

export const ComboTrackingProviders = [
  {
    provide: 'COMBO_TRACKING_REPOSITORY',
    useFactory: (datasource: DataSource) =>
      datasource.getRepository(ComboTrackingEntity),
    inject: ['DATA_SOURCE'],
  },
];
