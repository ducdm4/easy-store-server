import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { PromoCodeEntity } from './promoCode.entity';
import { CustomerEntity } from './customer.entity';

@Entity({ name: 'promo-code-on-hold' })
export class PromoCodeOnHoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PromoCodeEntity)
  code: PromoCodeEntity;

  @ManyToOne(() => CustomerEntity)
  customer: CustomerEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
