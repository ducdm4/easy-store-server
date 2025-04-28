import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { StoreEntity } from './store.entity';
import { CustomerEntity } from './customer.entity';
import { PackagesEntity } from './package.entity';
import { ReceiptEntity } from './receipt.entity';

// add new record to this table each time we have invoice with package
@Entity({ name: 'package-purchased' })
export class PackagePurchasedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // receiptId of the purchase
  @ManyToOne(() => ReceiptEntity)
  receipt: ReceiptEntity;

  @ManyToOne(() => CustomerEntity)
  customer: CustomerEntity;

  @ManyToOne(() => PackagesEntity)
  package: PackagesEntity;

  @Column({ type: 'datetime', nullable: false })
  purchasedAt: Date;

  @Column({ type: 'datetime', nullable: false })
  validUntil: Date; // customer can use this package until this time

  @Column({ type: Number, nullable: false })
  timeCanUseTotal: number; // total times can use this package

  @Column({ type: Number, nullable: false })
  timeCanUseLeft: number; // customer can use this package this many times

  @ManyToOne(() => StoreEntity)
  @JoinColumn({ name: 'storeId', referencedColumnName: 'id' })
  store: StoreEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
