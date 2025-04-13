import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ProductEntity } from './product.entity';
import { ComboEntity } from './combo.entity';
import { ReceiptEntity } from './receipt.entity';
import { PackagesEntity } from './package.entity';
import { ReceiptProductToppingEntity } from './receiptProductTopping.entity';
import { PackagePurchasedEntity } from './packagePurchased.entity';

@Entity({ name: 'receipt-products' })
export class ReceiptProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ReceiptEntity)
  receipt: ReceiptEntity;

  @ManyToOne(() => ProductEntity)
  product: ProductEntity; // product in product table

  @ManyToOne(() => ComboEntity)
  combo: ComboEntity; // will need to save both comboId and productId

  @ManyToOne(() => PackagesEntity)
  package: PackagesEntity;
  // will need to save both packageId and productId or packageId and comboId and productId
  // in case customer choose package contain both product and combo

  @ManyToOne(() => PackagePurchasedEntity)
  packagePurchased: PackagePurchasedEntity;
  // to determine what purchased package product or combo belong to

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

  @Column({ default: 0, type: 'decimal', precision: 11, scale: 2 })
  price: number; // price in product table, originalPrice if price is empty

  @Column({ default: 0, type: 'decimal', precision: 11, scale: 2 })
  priceDiscounted: number; // price after discount (apply promo code or campaign or customer rank...)

  @Column({ nullable: true, default: null, type: 'text' })
  note: string;

  @Column({ default: 0 })
  groupNumber: number;
  // group products belongs to same combo, products or combos in the same package

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
