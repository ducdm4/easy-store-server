import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ProductEntity } from './product.entity';
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

  @Column({ default: false })
  isInCombo: boolean;

  @Column({ default: 0, type: 'decimal', precision: 11, scale: 2 })
  price: number; // sale price

  @Column({ default: 0, type: 'decimal', precision: 11, scale: 2 })
  priceDiscounted: number; // price after discount

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
