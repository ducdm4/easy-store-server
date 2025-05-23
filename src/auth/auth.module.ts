import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from '../user/users.service';
import { StoresService } from '../store/stores.service';
import { MailService } from '../mail/mail.service';
import { DatabaseModule } from '../database/database.module';
import { UserProviders } from '../typeorm/providers/user.providers';
import { EmployeeProviders } from '../typeorm/providers/employee.providers';
import { PersonalInfoProviders } from '../typeorm/providers/personalInfo.providers';
import { StoreProviders } from '../typeorm/providers/store.providers';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    DatabaseModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AuthController],
  providers: [
    ...UserProviders,
    ...EmployeeProviders,
    ...PersonalInfoProviders,
    ...StoreProviders,
    AuthService,
    UsersService,
    LocalStrategy,
    JwtStrategy,
    MailService,
    StoresService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
