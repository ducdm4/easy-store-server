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

@Entity({ name: 'promo-codes' })
export class PromoCodeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  // discount code, can be null in case of auto applied
  code: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ nullable: true, default: null })
  quantity: number; // null: unlimited, number of times customer can use this code

  @Column({ nullable: true, default: 0 })
  numbersUsed: number; // number of code used

  @Column({ nullable: true })
  discountType: number; // 0: percent, 1: money

  @Column({ default: 0, type: 'decimal', precision: 11, scale: 2 })
  discountAmount: number; // total discount in percent or money base on discountType

  @Column({ nullable: true, type: 'datetime', default: null })
  timeStart: Date;

  @Column({ nullable: true, type: 'datetime', default: null })
  timeEnd: Date;

  @ManyToOne(() => StoreEntity)
  store: StoreEntity;

  @Column({ nullable: true, default: null })
  itemQuantity: number;

  @ManyToOne(() => ProductEntity)
  product: ProductEntity; // specific product to apply

  @ManyToOne(() => ComboEntity)
  combo: ComboEntity; // specific combo to apply

  @ManyToOne(() => PackagesEntity)
  package: PackagesEntity; // specific package to apply

  @Column({ default: true })
  canUseWithOther: boolean; // can be use with other promo code or campaign

  @Column({ default: false })
  isPaused: boolean; // in case needed to pause the promo code

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
