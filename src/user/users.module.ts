import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../database/database.module';
import { UserProviders } from '../typeorm/providers/user.providers';
import { StoreProviders } from '../typeorm/providers/store.providers';
import { PersonalInfoProviders } from '../typeorm/providers/personalInfo.providers';
import { MailService } from '../mail/mail.service';
import { StoresService } from '../store/stores.service';
import { AuthService } from '../auth/auth.service';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [UsersController],
  providers: [
    ...UserProviders,
    ...PersonalInfoProviders,
    ...StoreProviders,
    UsersService,
    MailService,
    AuthService,
    JwtStrategy,
    StoresService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
