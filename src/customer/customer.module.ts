import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { StoresService } from '../store/stores.service';
import { PhotosService } from '../photo/photos.service';
import { PersonalInfoService } from '../personalInfo/personalInfo.service';
import { DatabaseModule } from '../database/database.module';
import { StoreProviders } from '../typeorm/providers/store.providers';
import { UserProviders } from '../typeorm/providers/user.providers';
import { PhotoProviders } from '../typeorm/providers/photo.providers';
import { CustomerProviders } from '../typeorm/providers/customer.providers';
import { PersonalInfoProviders } from '../typeorm/providers/personalInfo.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CustomerController],
  providers: [
    ...StoreProviders,
    ...PersonalInfoProviders,
    ...UserProviders,
    ...PhotoProviders,
    ...CustomerProviders,
    CustomerService,
    StoresService,
    PersonalInfoService,
    PhotosService,
  ],
  exports: [CustomerService],
})
export class CustomerModule {}
