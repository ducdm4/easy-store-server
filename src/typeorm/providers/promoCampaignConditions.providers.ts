import { DataSource } from 'typeorm';
import { PromoCampaignConditionsEntity } from '../entities/promoCampaignConditions.entity';

export const PromoCampaignConditionsProviders = [
  {
    provide: 'PROMO_CAMPAIGN_CONDITIONS_REPOSITORY',
    useFactory: (datasource: DataSource) =>
      datasource.getRepository(PromoCampaignConditionsEntity),
    inject: ['DATA_SOURCE'],
  },
];
