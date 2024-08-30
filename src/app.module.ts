import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './user/users.module';
import { PhotosModule } from './photo/photos.module';
import { ConfigsModule } from './config/configs.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AuthMiddleware } from './common/middleware/auth.middleware';
import { UsersController } from './user/users.controller';
import { StoresController } from './store/stores.controller';
import { PhotosController } from './photo/photos.controller';
import { ConfigsController } from './config/configs.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guard/roles.guard';
import { DatabaseModule } from './database/database.module';
import { MailModule } from './mail/mail.module';
import { EventsModule } from './events/events.module';
import { StoresModule } from './store/stores.module';
import { TasksModule } from './scheduleTask/scheduleTasks.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    PhotosModule,
    MailModule,
    ConfigsModule,
    EventsModule,
    TasksModule,
    StoresModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, AuthMiddleware)
      .forRoutes(
        UsersController,
        PhotosController,
        ConfigsController,
        StoresController,
      );
  }
}
