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
  OneToOne,
} from 'typeorm';
import { StoreEntity } from './store.entity';
import { PackageProductQuantityEntity } from './packageProductQuantity.entity';
import { PhotoEntity } from './photo.entity';

@Entity({ name: 'packages' })
export class PackagesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, type: 'text' })
  description: string;

  @Column({ default: 0, type: 'decimal', precision: 11, scale: 2 })
  originalPrice: number; // price before

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

  @Column({ nullable: true, type: 'decimal', precision: 11, scale: 2 })
  commissionRate: number; // rate of commission

  @Column({ nullable: true })
  commissionType: number; // 0: percent, 1: money

  @Column({ default: null, nullable: true })
  expiryTime: number; // number of days, limit the time customer can use the package

  @ManyToOne(() => StoreEntity)
  @JoinColumn({ name: 'storeId', referencedColumnName: 'id' })
  store: StoreEntity;

  @OneToOne(() => PhotoEntity, {
    cascade: true,
  })
  @JoinColumn({ name: 'imageId', referencedColumnName: 'id' })
  image: PhotoEntity;

  @Column({ default: 1 })
  timesCanUse: number;
  // number of times customer can use the package
  // timesCanUse, product and combo in package
  // can not be change if some customer already purchased this package

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
