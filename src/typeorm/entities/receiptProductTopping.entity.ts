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
import { ProductEntity } from './product.entity';
import { PromoCodeEntity } from './promoCode.entity';
import { ReceiptProductEntity } from './receiptProduct.entity';

@Entity({ name: 'receipt-product-topping' })
export class ReceiptProductToppingEntity {
  // to store the topping info of a product in a receipt product
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ReceiptProductEntity)
  receiptProduct: ReceiptProductEntity;

  @ManyToOne(() => ProductEntity)
  product: ProductEntity; // id of topping product

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
