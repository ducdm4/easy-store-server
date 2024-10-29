import { Module } from '@nestjs/common';
import { ProductTransactionsController } from './productTransactions.controller';
import { ProductTransactionsService } from './productTransactions.service';
// import { StoresService } from '../store/stores.service';
import { ProductTransactionsProviders } from '../typeorm/providers/productTransactions.providers';
// import { UserProviders } from '../typeorm/providers/user.providers';
// import { StoreProviders } from '../typeorm/providers/store.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductTransactionsController],
  providers: [
    ...ProductTransactionsProviders,
    ProductTransactionsService,
    // StoresService,
  ],
  exports: [ProductTransactionsService],
})
export class ProductTransactionsModule {}
