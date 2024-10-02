import { Module } from '@nestjs/common';
import { ConfigsController } from './configs.controller';
import { ConfigsService } from './configs.service';
import { StoresService } from '../store/stores.service';
import { ConfigProviders } from '../typeorm/providers/config.providers';
import { UserProviders } from '../typeorm/providers/user.providers';
import { StoreProviders } from '../typeorm/providers/store.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ConfigsController],
  providers: [
    ...ConfigProviders,
    ...UserProviders,
    ...StoreProviders,
    ConfigsService,
    StoresService,
  ],
  exports: [ConfigsService],
})
export class ConfigsModule {}
