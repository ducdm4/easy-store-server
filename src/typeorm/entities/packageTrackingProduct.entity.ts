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
import { ComboEntity } from './combo.entity';
import { PackageTrackingEntity } from './packageTracking.entity';

@Entity({ name: 'package-tracking-product' })
export class PackageTrackingProductEntity {
  // this entity to track the quantity of product or combo used
  // each time user come to store
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PackageTrackingEntity)
  packageTracking: PackageTrackingEntity;

  @ManyToOne(() => ProductEntity)
  product: ProductEntity;

  @ManyToOne(() => ComboEntity)
  combo: ComboEntity;

  @Column({ nullable: false })
  quantityUsed: number; // number used in this time

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
