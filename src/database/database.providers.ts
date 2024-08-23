import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'duchien123@',
  database: 'easy_store',
  entities: [__dirname + '/../**/*/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../**/*/migrations/*{.ts,.js}'],
  migrationsRun: true,
  synchronize: false,
});

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      return dataSource.initialize();
    },
  },
];
