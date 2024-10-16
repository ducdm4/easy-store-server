import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { StoreEntity } from './store.entity';
import { PackageProductQuantityEntity } from './packageProductQuantity.entity';

@Entity({ name: 'packages' })
export class PackagesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, type: 'text' })
  description: string;

  @Column({ default: 0, type: 'decimal', precision: 11, scale: 2 })
  price: number;

  @OneToMany(
    () => PackageProductQuantityEntity,
    (packageProduct) => packageProduct.package,
    {
      cascade: true,
    },
  )
  packageProductQuantity: PackageProductQuantityEntity[];

  @Column({ default: null, nullable: true })
  expiryTime: number; // number of days, limit the time customer can use the package

  @ManyToOne(() => StoreEntity)
  @JoinColumn({ name: 'storeId', referencedColumnName: 'id' })
  store: StoreEntity;

  @Column({ default: 1 })
  timesCanUse: number;
  // number of times customer can use the package

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
