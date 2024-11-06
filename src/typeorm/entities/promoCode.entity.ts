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
import { PackagesEntity } from './package.entity';

@Entity({ name: 'promo-codes' })
export class PromoCodeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false }) // discount code
  code: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ nullable: true, default: null })
  quantity: number; // null: unlimited, number of times customer can use this code

  @Column({ nullable: false })
  discountType: number; // 0: percent, 1: money

  @Column({ nullable: true, type: 'float' })
  total: number; // total discount in percent or money base on discountType

  @Column({ nullable: true, type: 'datetime', default: null })
  timeStart: Date;

  @Column({ nullable: true, type: 'datetime', default: null })
  timeEnd: Date;

  @ManyToOne(() => StoreEntity)
  store: StoreEntity;

  @Column({ default: false, type: 'tinyint' })
  type: number; // apply for 0: product, 1: combo, 2: package, 3: whole receipt

  @ManyToMany(() => ProductEntity)
  @JoinTable()
  products: ProductEntity[]; // specific product to apply

  @ManyToMany(() => ComboEntity)
  @JoinTable()
  combos: ComboEntity[]; // specific combo to apply

  @ManyToMany(() => PackagesEntity)
  @JoinTable()
  packages: PackagesEntity[]; // specific package to apply

  @Column({ default: false })
  isAutoApply: boolean; // auto apply when create receipt

  @Column({ default: false })
  isPaused: boolean; // in case needed to pause the promo code

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
