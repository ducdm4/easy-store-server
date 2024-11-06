import { Module } from '@nestjs/common';
import { MoneyTransactionsController } from './moneyTransactions.controller';
import { MoneyTransactionsService } from './moneyTransactions.service';
import { MoneyBalanceDailyService } from './moneyBalanceDaily.service';
import { StoresService } from '../store/stores.service';
import { ProductService } from '../product/product.service';
import { ProductInStockDailyService } from '../product/productInStockDaily.service';
import { ConfigsService } from '../config/configs.service';
// import { ProductInStockDailyService } from '../product/productInStockDaily.service';
import { MoneyTransactionsProviders } from '../typeorm/providers/moneyTransactions.providers';
import { MoneyBalanceDailyProviders } from '../typeorm/providers/moneyBalanceDaily.provider';
import { UserProviders } from '../typeorm/providers/user.providers';
import { StoreProviders } from '../typeorm/providers/store.providers';
import { ProductProviders } from '../typeorm/providers/product.providers';
import { ProductInStockDailyProviders } from '../typeorm/providers/productInStockDaily.providers';
import { ConfigProviders } from '../typeorm/providers/config.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [MoneyTransactionsController],
  providers: [
    ...MoneyTransactionsProviders,
    ...UserProviders,
    ...StoreProviders,
    ...MoneyBalanceDailyProviders,
    ...ProductProviders,
    ...ProductInStockDailyProviders,
    ...ConfigProviders,
    MoneyTransactionsService,
    MoneyBalanceDailyService,
    StoresService,
    ProductService,
    ProductInStockDailyService,
    ConfigsService,
  ],
  exports: [MoneyTransactionsService],
})
export class MoneyTransactionsModule {}
