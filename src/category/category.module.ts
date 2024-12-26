import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { StoresService } from '../store/stores.service';
import { PhotosService } from '../photo/photos.service';
import { PersonalInfoService } from '../personalInfo/personalInfo.service';
import { DatabaseModule } from '../database/database.module';
import { StoreProviders } from '../typeorm/providers/store.providers';
import { PhotoProviders } from '../typeorm/providers/photo.providers';
import { ProductProviders } from '../typeorm/providers/product.providers';
import { UserProviders } from '../typeorm/providers/user.providers';
import { PersonalInfoProviders } from '../typeorm/providers/personalInfo.providers';
import { ComboProviders } from '../typeorm/providers/combo.providers';
import { CategoriesProviders } from '../typeorm/providers/category.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController],
  providers: [
    ...CategoriesProviders,
    ...UserProviders,
    ...StoreProviders,
    CategoryService,
    StoresService,
  ],
  exports: [CategoryService],
})
export class CategoryModule {}
