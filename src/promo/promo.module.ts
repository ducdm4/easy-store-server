import { Module } from '@nestjs/common';
import { PromoController } from './promo.controller';
import { PromoService } from './promo.service';
import { StoresService } from '../store/stores.service';
import { DatabaseModule } from '../database/database.module';
import { PromoCodeProviders } from '../typeorm/providers/promoCode.providers';
import { UserProviders } from '../typeorm/providers/user.providers';
import { StoreProviders } from '../typeorm/providers/store.providers';
import { PromoCampaignsProviders } from '../typeorm/providers/promoCampaigns.providers';
import { PromoCampaignConditionsProviders } from '../typeorm/providers/promoCampaignConditions.providers';
import { PromoCampaignBonusProviders } from '../typeorm/providers/promoCampaignBonus.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [PromoController],
  providers: [
    ...PromoCodeProviders,
    ...StoreProviders,
    ...UserProviders,
    ...PromoCampaignsProviders,
    ...PromoCampaignConditionsProviders,
    ...PromoCampaignBonusProviders,
    PromoService,
    StoresService,
  ],
  exports: [PromoService],
})
export class PromoModule {}
