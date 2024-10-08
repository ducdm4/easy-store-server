import { Module } from '@nestjs/common';
import { TasksService } from './scheduleTasks.service';
import { NotificationsService } from '../notification/notifications.service';
import { UsersService } from '../user/users.service';
import { MailService } from '../mail/mail.service';
import { NotificationProviders } from '../typeorm/providers/notification.providers';
import { UserProviders } from '../typeorm/providers/user.providers';
import { StoreProviders } from '../typeorm/providers/store.providers';
import { EmployeeProviders } from '../typeorm/providers/employee.providers';
import { PersonalInfoProviders } from '../typeorm/providers/personalInfo.providers';
import { DatabaseModule } from '../database/database.module';
import { AuthService } from '../auth/auth.service';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { StoresService } from '../store/stores.service';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [
    ...NotificationProviders,
    ...UserProviders,
    ...EmployeeProviders,
    ...PersonalInfoProviders,
    ...StoreProviders,
    JwtStrategy,
    MailService,
    TasksService,
    NotificationsService,
    UsersService,
    AuthService,
    StoresService,
  ],
  exports: [TasksService],
})
export class TasksModule {}
