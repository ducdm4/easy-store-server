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
  OneToMany,
} from 'typeorm';
import { StoreEntity } from './store.entity';
import { ProductEntity } from './product.entity';
import { ComboEntity } from './combo.entity';
import { PromoCodeEntity } from './promoCode.entity';
import { ReceiptEntity } from './receipt.entity';
import { PackagesEntity } from './package.entity';
import { ReceiptProductToppingEntity } from './receiptProductTopping.entity';

@Entity({ name: 'receipt-products' })
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

  @OneToMany(
    () => ReceiptProductToppingEntity,
    (receiptProductToppingQuantity) =>
      receiptProductToppingQuantity.receiptProduct,
    {
      cascade: true,
    },
  )
  topping: ReceiptProductToppingEntity[];

  @Column({ default: 1, type: 'decimal', precision: 5, scale: 1 })
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
