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
} from 'typeorm';
import { PhotoEntity } from './photo.entity';
import { StoreEntity } from './store.entity';

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

  @OneToOne(() => PhotoEntity)
  @JoinColumn({ name: 'imageId', referencedColumnName: 'id' })
  image: PhotoEntity;

  @Column({ default: 0 })
  price: string;

  @Column({ nullable: true })
  commissionRate: string; // rate of commission

  @Column({ nullable: true })
  commissionType: number; // 0: percent, 1: money

  @ManyToOne(() => StoreEntity)
  @JoinColumn({ name: 'storeId', referencedColumnName: 'id' })
  store: StoreEntity;

  @Column({ nullable: false })
  unit: string;

  @Column({ nullable: false })
  category: string;

  @Column({ nullable: true })
  duration: number;

  @Column({ nullable: true })
  barcode: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
