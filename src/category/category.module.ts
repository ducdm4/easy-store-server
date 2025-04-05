import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { StoresService } from '../store/stores.service';
import { DatabaseModule } from '../database/database.module';
import { StoreProviders } from '../typeorm/providers/store.providers';
import { UserProviders } from '../typeorm/providers/user.providers';
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
