import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductInStockDailyService } from './productInStockDaily.service';
import { StoresService } from '../store/stores.service';
import { PhotosService } from '../photo/photos.service';
import { ConfigsService } from '../config/configs.service';
import { PersonalInfoService } from '../personalInfo/personalInfo.service';
import { DatabaseModule } from '../database/database.module';
import { ProductInStockDailyProviders } from '../typeorm/providers/productInStockDaily.providers';
import { StoreProviders } from '../typeorm/providers/store.providers';
import { PhotoProviders } from '../typeorm/providers/photo.providers';
import { ProductProviders } from '../typeorm/providers/product.providers';
import { UserProviders } from '../typeorm/providers/user.providers';
import { PersonalInfoProviders } from '../typeorm/providers/personalInfo.providers';
import { ConfigProviders } from '../typeorm/providers/config.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController],
  providers: [
    ...StoreProviders,
    ...PhotoProviders,
    ...ProductProviders,
    ...UserProviders,
    ...PersonalInfoProviders,
    ...ConfigProviders,
    ...ProductInStockDailyProviders,
    ProductService,
    ProductInStockDailyService,
    StoresService,
    PhotosService,
    PersonalInfoService,
    ConfigsService,
  ],
  exports: [ProductService, ProductInStockDailyService],
})
export class ProductModule {}
