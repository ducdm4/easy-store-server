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
import { ProductEntity } from './product.entity';
import { ComboEntity } from './combo.entity';
import { PackagesEntity } from './package.entity';
import { CustomerEntity } from './customer.entity';
import { ReceiptEntity } from './receipt.entity';

@Entity({ name: 'un-used-promo' })
export class UnUsedPromoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CustomerEntity)
  customer: CustomerEntity;

  @ManyToOne(() => ProductEntity)
  product: ProductEntity; // specific product to apply

  @ManyToOne(() => ComboEntity)
  combo: ComboEntity; // specific combo to apply

  @ManyToOne(() => PackagesEntity)
  package: PackagesEntity; // specific package to apply

  @Column({ default: 0, type: 'tinyint' })
  discountType: number;
  // 0: discount percent on next n product, 1: discount money on next n product
  // if prod and combo and package all null then will be applied for whole receipt

  @Column({ default: 0, type: 'decimal', precision: 5, scale: 2 })
  discountAmount: number;
  // number of percent or money to be discount.

  // each bonus will be one row in this table

  @Column({ nullable: true, type: 'datetime', default: null })
  dueDate: Date;

  @ManyToOne(() => ReceiptEntity)
  fromReceipt: ReceiptEntity;

  @Column({ nullable: true, type: 'datetime', default: null })
  used: Date;

  @ManyToOne(() => StoreEntity)
  store: StoreEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
