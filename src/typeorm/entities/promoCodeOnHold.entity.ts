import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { PromoCodeEntity } from './promoCode.entity';
import { ReceiptEntity } from './receipt.entity';

@Entity({ name: 'promo-code-on-hold' })
export class PromoCodeOnHoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PromoCodeEntity)
  code: PromoCodeEntity;

  @ManyToOne(() => ReceiptEntity)
  receipt: ReceiptEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
