import { Module } from '@nestjs/common';
import { PackagesController } from './packages.controller';
import { PackagesService } from './packages.service';
import { StoresService } from '../store/stores.service';
import { PhotosService } from '../photo/photos.service';
import { PersonalInfoService } from '../personalInfo/personalInfo.service';
import { DatabaseModule } from '../database/database.module';
import { StoreProviders } from '../typeorm/providers/store.providers';
import { PhotoProviders } from '../typeorm/providers/photo.providers';
import { ProductProviders } from '../typeorm/providers/product.providers';
import { UserProviders } from '../typeorm/providers/user.providers';
import { PersonalInfoProviders } from '../typeorm/providers/personalInfo.providers';
import { PackagesProviders } from '../typeorm/providers/packages.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [PackagesController],
  providers: [
    ...StoreProviders,
    ...PhotoProviders,
    ...ProductProviders,
    ...UserProviders,
    ...PersonalInfoProviders,
    ...PackagesProviders,
    PackagesService,
    StoresService,
    PhotosService,
    PersonalInfoService,
  ],
  exports: [PackagesService],
})
export class PackagesModule {}
