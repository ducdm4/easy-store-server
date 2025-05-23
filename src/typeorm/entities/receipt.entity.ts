import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { StoreEntity } from './store.entity';
import { SpaceUnitEntity } from './spaceUnit.entity';
import { ReceiptProductEntity } from './receiptProduct.entity';
import { CustomerEntity } from './customer.entity';
import { EmployeeInfoEntity } from './employeeInfo.entity';

@Entity({ name: 'receipts' })
export class ReceiptEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false }) // auto generated code: ie TA-300924-001, DI-300924-001
  code: string;

  @Column({ default: 0, type: 'decimal', precision: 11, scale: 2 })
  subTotal: number; // total before discount

  @Column({ default: 0, type: 'decimal', precision: 11, scale: 2 })
  total: number; // total after discount

  @Column({ default: 0, type: 'decimal', precision: 11, scale: 2 })
  totalItemDiscount: number; // total money deducted for item

  @Column({ default: 0, type: 'decimal', precision: 11, scale: 2 })
  discounted: number; // total money deducted for whole receipt

  @Column({ nullable: true })
  extraDiscount: number; // extra discount from owner, employee, ...(by percentage)
  // need manager access if above 20%

  @Column({ default: 0 })
  status: number;
  // 0: temporary save, 1: completed, 2: cancelled from temporary save,
  // 3: cancelled from completed (need manager access)

  @Column({ default: 0 })
  type: number;
  // 0: take away, 1: dine-in, 2: delivery

  @Column({ nullable: true })
  pointRewarded: number; // point rewarded from this receipt

  @OneToMany(
    () => ReceiptProductEntity,
    (receiptProduct) => receiptProduct.receipt,
    { cascade: true },
  )
  receiptProducts: ReceiptProductEntity[];

  @ManyToOne(() => StoreEntity)
  store: StoreEntity;

  @ManyToOne(() => CustomerEntity)
  customer: CustomerEntity;

  @Column({ nullable: true, default: null, type: 'text' })
  note: string;

  @OneToOne(() => SpaceUnitEntity)
  @JoinColumn()
  spaceUnit: SpaceUnitEntity; // space unit that customer use

  @Column({ nullable: true, default: null })
  deliveryAddress: string;

  @Column({ nullable: true, default: null })
  deliveryName: string;

  @Column({ nullable: true, default: null })
  deliveryPhone: string;

  @Column({ default: 0, type: 'decimal', precision: 11, scale: 2 })
  deliveryFee: number;

  @ManyToOne(() => EmployeeInfoEntity)
  createdBy: EmployeeInfoEntity; // employee that create receipt

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
