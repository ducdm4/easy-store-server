import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { PhotoEntity } from './photo.entity';
import { StoreEntity } from './store.entity';
import { ProductInStockDailyEntity } from './productInStockDaily.entity';
import { ProductTransactionsEntity } from './productTransactions.entity';
import { CategoryEntity } from './category.entity';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, type: 'text' })
  description: string;

  @Column({ type: 'tinyint', default: 0 })
  type: number; // 0: product, 1: topping

  @OneToOne(() => PhotoEntity, { cascade: true })
  @JoinColumn({ name: 'imageId', referencedColumnName: 'id' })
  image: PhotoEntity;

  @Column({ default: 0, type: 'decimal', precision: 11, scale: 2 })
  originalPrice: number; // price before

  @Column({ default: 0, type: 'decimal', precision: 11, scale: 2 })
  price: number; // sale price

  @Column({ nullable: true, type: 'decimal', precision: 11, scale: 2 })
  commissionRate: number; // rate of commission

  @Column({ nullable: true })
  commissionType: number; // 0: percent, 1: money

  @ManyToOne(() => StoreEntity)
  @JoinColumn({ name: 'storeId', referencedColumnName: 'id' })
  store: StoreEntity;

  @Column({ nullable: false })
  unit: string;

  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'categoryId', referencedColumnName: 'id' })
  category: CategoryEntity;

  @Column({ nullable: true })
  duration: number;

  @Column({ nullable: true })
  barcode: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: true })
  isStorable: boolean;

  @Column({ default: 0 })
  maxSalePerTime: number;
  // 0 equals no limit
  // max number of product can be sold in one time
  // for topping it the max number of topping can be added

  @ManyToMany(() => CategoryEntity)
  @JoinTable()
  toppingCategory: CategoryEntity[];

  @OneToMany(
    () => ProductInStockDailyEntity,
    (productInStock) => productInStock.product,
    {
      cascade: true,
    },
  )
  productInStock: ProductInStockDailyEntity[];

  @OneToMany(
    () => ProductTransactionsEntity,
    (productTransactions) => productTransactions.product,
    {
      cascade: true,
    },
  )
  productTransactions: ProductTransactionsEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
