import { Module } from '@nestjs/common';
import { PersonalInfoController } from './personalInfo.controller';
import { PersonalInfoService } from './personalInfo.service';
import { StoresService } from '../store/stores.service';
import { PhotosService } from '../photo/photos.service';
import { DatabaseModule } from '../database/database.module';
import { StoreProviders } from '../typeorm/providers/store.providers';
import { PersonalInfoProviders } from '../typeorm/providers/personalInfo.providers';
import { EmployeeProviders } from '../typeorm/providers/employee.providers';
import { UserProviders } from '../typeorm/providers/user.providers';
import { PhotoProviders } from '../typeorm/providers/photo.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [PersonalInfoController],
  providers: [
    ...StoreProviders,
    ...PersonalInfoProviders,
    ...EmployeeProviders,
    ...UserProviders,
    ...PhotoProviders,
    PersonalInfoService,
    StoresService,
    PhotosService,
  ],
  exports: [PersonalInfoService],
})
export class PersonalInfoModule {}
