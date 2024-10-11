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
import { PackagePurchasedEntity } from './packagePurchased.entity';
import { PackageTrackingProductEntity } from './packageTrackingProduct.entity';

@Entity({ name: 'package-tracking' })
export class PackageTrackingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PackagePurchasedEntity)
  packagePurchased: PackagePurchasedEntity;

  @OneToMany(
    () => PackageTrackingProductEntity,
    (packageTrackingProduct) => packageTrackingProduct.packageTracking,
  )
  packageTrackingProduct: PackageTrackingProductEntity[];

  @Column({ type: 'datetime', nullable: false })
  usedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
