import { DataSource } from 'typeorm';
import { PersonalInfoEntity } from '../entities/personalInfo.entity';

export const PersonalInfoProviders = [
  {
    provide: 'PERSONAL_INFO_REPOSITORY',
    useFactory: (datasource: DataSource) =>
      datasource.getRepository(PersonalInfoEntity),
    inject: ['DATA_SOURCE'],
  },
];
