import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { StoreEntity } from './store.entity';
import { PhotoEntity } from './photo.entity';
import { ComboQuantityEntity } from './comboQuantity.entity';

@Entity({ name: 'combos' })
export class ComboEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, type: 'text' })
  description: string;

  @OneToOne(() => PhotoEntity, {
    cascade: true,
  })
  @JoinColumn({ name: 'imageId', referencedColumnName: 'id' })
  image: PhotoEntity;

  @Column({ default: 0, type: 'decimal', precision: 11, scale: 2 })
  originalPrice: number; // price before

  @Column({ default: 0, type: 'decimal', precision: 11, scale: 2 })
  price: number;

  @Column({ nullable: true, type: 'decimal', precision: 11, scale: 2 })
  commissionRate: number; // rate of commission

  @Column({ nullable: true })
  commissionType: number; // 0: percent, 1: money

  @ManyToOne(() => StoreEntity)
  @JoinColumn({ name: 'storeId', referencedColumnName: 'id' })
  store: StoreEntity;

  @OneToMany(
    () => ComboQuantityEntity,
    (comboQuantity) => comboQuantity.combo,
    {
      cascade: true,
    },
  )
  comboQuantity: ComboQuantityEntity[];

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
