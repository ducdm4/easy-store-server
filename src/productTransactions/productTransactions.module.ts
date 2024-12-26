import { Module } from '@nestjs/common';
import { ProductTransactionsController } from './productTransactions.controller';
import { ProductTransactionsService } from './productTransactions.service';
import { StoresService } from '../store/stores.service';
import { ProductService } from '../product/product.service';
import { PhotosService } from '../photo/photos.service';
import { ConfigsService } from '../config/configs.service';
import { ProductInStockDailyService } from '../product/productInStockDaily.service';
import { MoneyTransactionsService } from '../moneyTransactions/moneyTransactions.service';
import { MoneyBalanceDailyService } from '../moneyTransactions/moneyBalanceDaily.service';
import { ProductTransactionsProviders } from '../typeorm/providers/productTransactions.providers';
import { MoneyTransactionsProviders } from '../typeorm/providers/moneyTransactions.providers';
import { MoneyBalanceDailyProviders } from '../typeorm/providers/moneyBalanceDaily.provider';
import { UserProviders } from '../typeorm/providers/user.providers';
import { PhotoProviders } from '../typeorm/providers/photo.providers';
import { ConfigProviders } from '../typeorm/providers/config.providers';
import { StoreProviders } from '../typeorm/providers/store.providers';
import { ProductInStockDailyProviders } from '../typeorm/providers/productInStockDaily.providers';
import { ProductProviders } from '../typeorm/providers/product.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductTransactionsController],
  providers: [
    ...ProductTransactionsProviders,
    ...UserProviders,
    ...StoreProviders,
    ...ProductProviders,
    ...PhotoProviders,
    ...ConfigProviders,
    ...ProductInStockDailyProviders,
    ...MoneyTransactionsProviders,
    ...MoneyBalanceDailyProviders,
    ProductTransactionsService,
    StoresService,
    ProductService,
    PhotosService,
    ConfigsService,
    ProductInStockDailyService,
    MoneyTransactionsService,
    MoneyBalanceDailyService,
  ],
  exports: [ProductTransactionsService],
})
export class ProductTransactionsModule {}
