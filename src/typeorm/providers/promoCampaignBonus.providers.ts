import { DataSource } from 'typeorm';
import { PromoCampaignBonusEntity } from '../entities/promoCampaignBonus.entity';

export const PromoCampaignBonusProviders = [
  {
    provide: 'PROMO_CAMPAIGN_BONUS_REPOSITORY',
    useFactory: (datasource: DataSource) =>
      datasource.getRepository(PromoCampaignBonusEntity),
    inject: ['DATA_SOURCE'],
  },
];
