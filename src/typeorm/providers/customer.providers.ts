import { DataSource } from 'typeorm';
import { CustomerEntity } from '../entities/customer.entity';

export const CustomerProviders = [
  {
    provide: 'CUSTOMER_REPOSITORY',
    useFactory: (datasource: DataSource) =>
      datasource.getRepository(CustomerEntity),
    inject: ['DATA_SOURCE'],
  },
];
