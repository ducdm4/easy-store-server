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
import { ReceiptEntity } from './receipt.entity';

@Entity({ name: 'package-tracking' })
export class PackageTrackingEntity {
  // each record will contain unique receipt & packagePurchased
  // eg: if this receipt customer used the package 3 times,
  // there will be 1 record with receiptId & packagePurchasedId & timesUsed = 3
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PackagePurchasedEntity)
  packagePurchased: PackagePurchasedEntity;

  // receiptId of the purchase
  @ManyToOne(() => ReceiptEntity)
  receipt: ReceiptEntity;

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
