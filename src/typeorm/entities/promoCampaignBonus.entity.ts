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
import { PromoCampaignsEntity } from './promoCampaigns.entity';

@Entity({ name: 'promo-campaign-bonus' })
export class PromoCampaignBonusEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PromoCampaignsEntity)
  promoCampaigns: PromoCampaignsEntity;

  @ManyToOne(() => ProductEntity)
  product: ProductEntity;

  @ManyToOne(() => ComboEntity)
  combo: ComboEntity;

  @ManyToOne(() => PackagesEntity)
  package: PackagesEntity;

  @Column({ default: 0, type: 'tinyint' })
  discountType: number;
  // 0: discount percent on next n product, 1: discount money on next n product
  // if prod and combo and package all null then will be applied for whole receipt

  @Column({ default: 0, type: 'decimal', precision: 5, scale: 2 })
  discountAmount: number;
  // number of percent or money to be discount.

  @Column({ default: 0, type: 'integer' })
  quantity: number;
  // how many next product or receipt can be applied

  @Column({ default: 0 })
  expiryDate: number; // number of date to expire, 0 if forever

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
