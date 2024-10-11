import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { StoreEntity } from './store.entity';
import { SpaceUnitEntity } from './spaceUnit.entity';
import { PromoCodeEntity } from './promoCode.entity';
import { ReceiptProductEntity } from './receiptProduct.entity';
import { CustomerEntity } from './customer.entity';
import { EmployeeInfoEntity } from './employeeInfo.entity';

@Entity({ name: 'receipts' })
export class ReceiptEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false }) // auto generated code: ie TA-300924-001, DI-300924-001
  code: string;

  @Column({ nullable: false })
  subTotal: number; // total before discount

  @Column({ nullable: false })
  total: number; // total after discount

  @Column({ nullable: true })
  memberDiscount: number; // discount from member rank

  @Column({ nullable: true })
  extraDiscount: number; // extra discount from owner, employee, ...(by percentage)

  @Column({ nullable: true })
  promoDiscount: number; // discount from promo code

  @OneToMany(
    () => ReceiptProductEntity,
    (receiptProduct) => receiptProduct.receipt,
    { cascade: true },
  )
  receiptProducts: ReceiptProductEntity[];

  @ManyToMany(() => PromoCodeEntity)
  @JoinTable()
  promoCodeList: PromoCodeEntity[];

  @ManyToOne(() => StoreEntity)
  store: StoreEntity;

  @ManyToOne(() => CustomerEntity)
  customer: CustomerEntity;

  @OneToOne(() => SpaceUnitEntity)
  @JoinColumn()
  spaceUnit: SpaceUnitEntity; // space unit that customer use

  @ManyToOne(() => EmployeeInfoEntity)
  createdBy: EmployeeInfoEntity; // employee that create receipt

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
