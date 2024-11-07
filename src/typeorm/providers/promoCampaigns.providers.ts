import { DataSource } from 'typeorm';
import { PromoCampaignsEntity } from '../entities/promoCampaigns.entity';

export const PromoCampaignsProviders = [
  {
    provide: 'PROMO_CAMPAIGNS_REPOSITORY',
    useFactory: (datasource: DataSource) =>
      datasource.getRepository(PromoCampaignsEntity),
    inject: ['DATA_SOURCE'],
  },
];
