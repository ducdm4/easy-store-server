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

@Entity({ name: 'spends' })
export class SpendEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ nullable: false })
  amount: number;

  @Column({ nullable: false, type: 'tinyint' })
  type: number; // 0: daily spend, 1: salary payment, 2: import goods, 3: other

  @ManyToOne(() => StoreEntity)
  store: StoreEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
