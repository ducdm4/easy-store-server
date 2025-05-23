import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { ProductEntity } from './product.entity';

@Index(['product', 'quantity', 'date'])
@Entity({ name: 'product-transactions' })
export class ProductTransactionsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductEntity)
  product: ProductEntity;

  @Column({ nullable: false, type: 'text' })
  reason: string;

  @Column({ default: 0, type: 'integer' })
  type: number; // 0: import, 1: export

  @Column({ default: 1, type: 'decimal', precision: 5, scale: 1 })
  quantity: number;

  @Column({ type: 'datetime' })
  date: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
