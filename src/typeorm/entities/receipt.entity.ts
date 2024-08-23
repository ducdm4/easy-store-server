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

@Entity({ name: 'receipts' })
export class ReceiptEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  code: string;

  @Column({ nullable: false })
  subTotal: number;

  @Column({ nullable: false })
  total: number;

  @Column({ nullable: true })
  memberDiscount: number;

  @Column({ nullable: true })
  extraDiscount: number;

  @Column({ nullable: true })
  promoDiscount: number;

  @OneToMany(
    () => ReceiptProductEntity,
    (receiptProduct) => receiptProduct.receipt,
    { cascade: true },
  )
  receiptProducts: ReceiptProductEntity[];

  @ManyToMany(() => PromoCodeEntity)
  @JoinTable()
  promoCodes: PromoCodeEntity[];

  @ManyToOne(() => StoreEntity)
  store: StoreEntity;

  @ManyToOne(() => CustomerEntity)
  customer: CustomerEntity;

  @OneToOne(() => SpaceUnitEntity)
  @JoinColumn()
  spaceUnit: SpaceUnitEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
