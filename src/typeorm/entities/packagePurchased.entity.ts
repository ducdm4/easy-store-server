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

// add new record to this table each time we have invoice with package
@Entity({ name: 'package-purchased' })
export class PackagePurchasedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CustomerEntity)
  customer: CustomerEntity;

  @ManyToOne(() => PackagesEntity)
  package: PackagesEntity;

  @Column({ type: 'datetime', nullable: false })
  purchasedAt: Date;

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
