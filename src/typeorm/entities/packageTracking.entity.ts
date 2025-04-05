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

@Entity({ name: 'package-tracking' })
export class PackageTrackingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PackagePurchasedEntity)
  packagePurchased: PackagePurchasedEntity;

  // number of times used this package in the visit
  @Column({ nullable: false, default: 1 })
  timesUsed: number;

  @Column({ type: 'datetime', nullable: false })
  usedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
