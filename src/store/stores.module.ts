import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { DatabaseModule } from '../database/database.module';
import { UserProviders } from '../typeorm/providers/user.providers';
import { StoreProviders } from '../typeorm/providers/store.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [StoresController],
  providers: [...UserProviders, ...StoreProviders, StoresService],
  exports: [StoresService],
})
export class StoresModule {}
