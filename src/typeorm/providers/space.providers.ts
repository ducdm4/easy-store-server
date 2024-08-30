import { DataSource } from 'typeorm';
import { SpaceEntity } from '../entities/space.entity';

export const SpaceProviders = [
  {
    provide: 'SPACE_REPOSITORY',
    useFactory: (datasource: DataSource) =>
      datasource.getRepository(SpaceEntity),
    inject: ['DATA_SOURCE'],
  },
];
