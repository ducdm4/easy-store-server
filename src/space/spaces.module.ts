import { Module } from '@nestjs/common';
import { SpacesController } from './spaces.controller';
import { SpacesService } from './spaces.service';
import { StoresService } from '../store/stores.service';
import { DatabaseModule } from '../database/database.module';
import { SpaceProviders } from '../typeorm/providers/space.providers';
import { SpaceUnitProviders } from '../typeorm/providers/spaceUnit.providers';
import { UserProviders } from '../typeorm/providers/user.providers';
import { StoreProviders } from '../typeorm/providers/store.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [SpacesController],
  providers: [
    ...SpaceProviders,
    ...UserProviders,
    ...StoreProviders,
    ...SpaceUnitProviders,
    SpacesService,
    StoresService,
  ],
  exports: [SpacesService],
})
export class SpacesModule {}
