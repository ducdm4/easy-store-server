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
import { SpacesController } from './space/spaces.controller';
import { CategoryController } from './category/category.controller';
import { EmployeeController } from './employee/employee.controller';
import { PersonalInfoController } from './personalInfo/personalInfo.controller';
import { ProductController } from './product/product.controller';
import { CustomerController } from './customer/customer.controller';
import { PromoController } from './promo/promo.controller';
import { MoneyTransactionsController } from './moneyTransactions/moneyTransactions.controller';
import { ComboController } from './combo/combo.controller';
import { PackagesController } from './packages/packages.controller';
import { ProductTransactionsController } from './productTransactions/productTransactions.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { MailModule } from './mail/mail.module';
import { EventsModule } from './events/events.module';
import { StoresModule } from './store/stores.module';
import { TasksModule } from './scheduleTask/scheduleTasks.module';
import { SpacesModule } from './space/spaces.module';
import { CategoryModule } from './category/category.module';
import { EmployeeModule } from './employee/employee.module';
import { CustomerModule } from './customer/customer.module';
import { PersonalInfoModule } from './personalInfo/personalInfo.module';
import { ProductModule } from './product/product.module';
import { MoneyTransactionsModule } from './moneyTransactions/moneyTransactions.module';
import { ComboModule } from './combo/combo.module';
import { PromoModule } from './promo/promo.module';
import { PackagesModule } from './packages/packages.module';
import { ProductTransactionsModule } from './productTransactions/productTransactions.module';
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
    SpacesModule,
    EmployeeModule,
    PersonalInfoModule,
    ProductModule,
    ComboModule,
    PackagesModule,
    ProductTransactionsModule,
    MoneyTransactionsModule,
    PromoModule,
    CategoryModule,
    CustomerModule,
  ],
  providers: [],
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
        SpacesController,
        EmployeeController,
        PersonalInfoController,
        ProductController,
        ComboController,
        PackagesController,
        ProductTransactionsController,
        MoneyTransactionsController,
        PromoController,
        CategoryController,
        CustomerController,
      );
  }
}
