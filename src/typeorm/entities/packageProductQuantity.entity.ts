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
import { ComboEntity } from './combo.entity';
import { PackagesEntity } from './package.entity';

@Entity({ name: 'package-product-quantity' })
export class PackageProductQuantityEntity {
  // this entity use to setting the quantity of product or
  // combo in the package
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PackagesEntity)
  package: PackagesEntity;

  // product or combo in the package
  @ManyToOne(() => ProductEntity)
  product: ProductEntity;

  @ManyToOne(() => ComboEntity)
  combo: ComboEntity;

  @Column({ default: 1 })
  quantity: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
