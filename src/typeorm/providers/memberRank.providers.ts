import { DataSource } from 'typeorm';
import { MemberRankEntity } from '../entities/memberRank.entity';

export const MemberRankProviders = [
  {
    provide: 'MEMBER_RANK_REPOSITORY',
    useFactory: (datasource: DataSource) =>
      datasource.getRepository(MemberRankEntity),
    inject: ['DATA_SOURCE'],
  },
];
