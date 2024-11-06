import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StoreEntity } from './store.entity';

@Entity({ name: 'money-balance-daily' })
export class MoneyBalanceDailyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0, type: 'decimal', precision: 14, scale: 2 })
  balance: number;

  @Column({ type: 'date' })
  date: Date;

  @ManyToOne(() => StoreEntity)
  store: StoreEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
