import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { StoreEntity } from './store.entity';

@Entity({ name: 'money-transactions' })
export class MoneyTransactionsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: 'text' })
  reason: string; // In money for receipt or for owner put money or from employee's fine,
  // out money for import goods or daily spend.

  @Column({ default: 0, type: 'decimal', precision: 14, scale: 2 })
  amount: number;

  @Column({ nullable: false, type: 'tinyint' })
  type: number; // 0: In, 1: Out

  @ManyToOne(() => StoreEntity)
  store: StoreEntity;

  @Column({ type: 'datetime' })
  date: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
