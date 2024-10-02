import { DataSource } from 'typeorm';
import { EmployeeServiceTrackingEntity } from '../entities/employeeServiceTracking.entity';

export const EmployeeServiceTrackingProviders = [
  {
    provide: 'EMPLOYEE_SERVICE_TRACKING_REPOSITORY',
    useFactory: (datasource: DataSource) =>
      datasource.getRepository(EmployeeServiceTrackingEntity),
    inject: ['DATA_SOURCE'],
  },
];
