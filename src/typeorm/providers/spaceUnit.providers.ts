import { DataSource } from 'typeorm';
import { SpaceUnitEntity } from '../entities/spaceUnit.entity';

export const SpaceUnitProviders = [
  {
    provide: 'SPACE_UNIT_REPOSITORY',
    useFactory: (datasource: DataSource) =>
      datasource.getRepository(SpaceUnitEntity),
    inject: ['DATA_SOURCE'],
  },
];
