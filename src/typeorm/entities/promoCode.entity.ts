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

@Entity({ name: 'promo-codes' })
export class PromoCodeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false }) // discount code
  name: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ nullable: true, default: null })
  quantity: number; // null: unlimited, number of times customer can use this code

  @Column({ nullable: false })
  discountType: number; // 0: percent, 1: money

  @Column({ nullable: true, type: 'float' })
  total: number; // total discount in percent or money base on discountType

  @Column({ nullable: true, type: 'datetime', default: null })
  timeStart: string;

  @Column({ nullable: true, type: 'datetime', default: null })
  timeEnd: string;

  @ManyToOne(() => StoreEntity)
  store: StoreEntity;

  @Column({ default: false, type: 'tinyint' })
  productOrCombo: number; // apply for 0: product, 1: combo, 2: both

  @ManyToOne(() => ProductEntity)
  product: ProductEntity; // specific product to apply, null if apply to all products

  @ManyToOne(() => ComboEntity)
  combo: ComboEntity; // specific combo to apply, null if apply to all combo

  @Column({ default: false })
  isAutoApply: boolean; // auto apply when create receipt

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
