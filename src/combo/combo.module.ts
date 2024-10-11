import { Module } from '@nestjs/common';
import { ComboController } from './combo.controller';
import { ComboService } from './combo.service';
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
import { ComboQuantityProviders } from '../typeorm/providers/comboQuantity.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ComboController],
  providers: [
    ...StoreProviders,
    ...PhotoProviders,
    ...ProductProviders,
    ...UserProviders,
    ...ComboProviders,
    ...PersonalInfoProviders,
    ...ComboQuantityProviders,
    ComboService,
    StoresService,
    PhotosService,
    PersonalInfoService,
  ],
  exports: [ComboService],
})
export class ComboModule {}
