import { Module } from '@nestjs/common';
import { ReceiptController } from './receipt.controller';
import { ReceiptService } from './receipt.service';
import { StoresService } from '../store/stores.service';
import { PromoService } from '../promo/promo.service';
import { DatabaseModule } from '../database/database.module';
import { StoreProviders } from '../typeorm/providers/store.providers';
import { ReceiptProviders } from '../typeorm/providers/receipt.providers';
import { ReceiptProductProviders } from '../typeorm/providers/receiptProduct.providers';
import { ReceiptProductToppingProviders } from '../typeorm/providers/receiptProductTopping.providers';
import { ProductProviders } from '../typeorm/providers/product.providers';
import { ComboProviders } from '../typeorm/providers/combo.providers';
import { PackagesProviders } from '../typeorm/providers/packages.providers';
import { PackagePurchasedProviders } from '../typeorm/providers/packagePurchased.providers';
import { PackageTrackingProviders } from '../typeorm/providers/packageTracking.providers';
import { ReceiptPromoProviders } from '../typeorm/providers/receiptPromo.providers';
import { PromoCodeProviders } from '../typeorm/providers/promoCode.providers';
import { PromoCampaignsProviders } from '../typeorm/providers/promoCampaigns.providers';
import { PromoCampaignConditionsProviders } from '../typeorm/providers/promoCampaignConditions.providers';
import { PromoCampaignBonusProviders } from '../typeorm/providers/promoCampaignBonus.providers';
import { UserProviders } from '../typeorm/providers/user.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ReceiptController],
  providers: [
    ...ReceiptProviders,
    ...ReceiptProductProviders,
    ...ReceiptProductToppingProviders,
    ...StoreProviders,
    ...UserProviders,
    ...ProductProviders,
    ...ComboProviders,
    ...PackagesProviders,
    ...PackagePurchasedProviders,
    ...PackageTrackingProviders,
    ...ReceiptPromoProviders,
    ...PromoCodeProviders,
    ...PromoCampaignsProviders,
    ...PromoCampaignConditionsProviders,
    ...PromoCampaignBonusProviders,
    ReceiptService,
    StoresService,
    PromoService,
  ],
  exports: [ReceiptService],
})
export class ReceiptModule {}
