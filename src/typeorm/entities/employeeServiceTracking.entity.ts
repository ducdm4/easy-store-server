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
import { EmployeeInfoEntity } from './employeeInfo.entity';
import { ReceiptEntity } from './receipt.entity';

@Entity({ name: 'employee-service-tracking' })
export class EmployeeServiceTrackingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => EmployeeInfoEntity)
  employee: EmployeeInfoEntity;

  @ManyToOne(() => ReceiptEntity)
  receipt: ReceiptEntity;

  // product employee performed
  @ManyToOne(() => ProductEntity)
  product: ProductEntity;

  // total commission earned from this service
  @Column({ nullable: false })
  totalEarned: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
