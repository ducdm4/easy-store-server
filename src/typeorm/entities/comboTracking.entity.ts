import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ComboEntity } from './combo.entity';
import { CustomerEntity } from './customer.entity';

@Entity({ name: 'combo-trackings' })
export class ComboTrackingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ComboEntity)
  combo: ComboEntity;

  @ManyToOne(() => CustomerEntity)
  customer: CustomerEntity;

  @Column({ nullable: false })
  quantityUsed: number;

  @Column({ nullable: false })
  remaining: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
