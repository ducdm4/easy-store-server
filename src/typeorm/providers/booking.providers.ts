import { DataSource } from 'typeorm';
import { BookingEntity } from '../entities/booking.entity';

export const BookingProviders = [
  {
    provide: 'BOOKING_REPOSITORY',
    useFactory: (datasource: DataSource) =>
      datasource.getRepository(BookingEntity),
    inject: ['DATA_SOURCE'],
  },
];
