import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { PackagePurchasedEntity } from './packagePurchased.entity';

@Entity({ name: 'package-tracking' })
export class PackageTrackingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PackagePurchasedEntity)
  packagePurchased: PackagePurchasedEntity;

  @Column({ nullable: false })
  quantityUsed: number; // number used in this time

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
