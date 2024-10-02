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
import { StoreEntity } from './store.entity';
import { ProductEntity } from './product.entity';
import { ComboEntity } from './combo.entity';
import { PromoCodeEntity } from './promoCode.entity';
import { ReceiptEntity } from './receipt.entity';
import { PackagesEntity } from './package.entity';

@Entity({ name: 'receiptProducts' })
export class ReceiptProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ReceiptEntity)
  receipt: ReceiptEntity;

  @ManyToOne(() => ProductEntity)
  product: ProductEntity;

  @ManyToOne(() => ComboEntity)
  combo: ComboEntity;

  @ManyToOne(() => PackagesEntity)
  package: PackagesEntity;

  @Column({ nullable: false })
  quantity: number;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  priceDiscount: number;

  @Column({ nullable: true })
  promoDiscount: number; // % discount from promo code

  @ManyToMany(() => PromoCodeEntity)
  @JoinTable()
  promoCodes: PromoCodeEntity[];

  @ManyToOne(() => StoreEntity)
  store: StoreEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
