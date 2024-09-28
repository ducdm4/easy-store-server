import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { StoresService } from '../store/stores.service';
import { PhotosService } from '../photo/photos.service';
import { PersonalInfoService } from '../personalInfo/personalInfo.service';
import { DatabaseModule } from '../database/database.module';
import { UserProviders } from '../typeorm/providers/user.providers';
import { StoreProviders } from '../typeorm/providers/store.providers';
import { EmployeeProviders } from '../typeorm/providers/employee.providers';
import { PersonalInfoProviders } from '../typeorm/providers/personalInfo.providers';
import { PhotoProviders } from '../typeorm/providers/photo.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [EmployeeController],
  providers: [
    ...UserProviders,
    ...StoreProviders,
    ...EmployeeProviders,
    ...PersonalInfoProviders,
    ...PhotoProviders,
    EmployeeService,
    StoresService,
    PhotosService,
    PersonalInfoService,
  ],
  exports: [EmployeeService],
})
export class EmployeeModule {}
