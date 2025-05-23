import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';
import { ComboEntity } from './combo.entity';
import { PackagesEntity } from './package.entity';
import { PromoCampaignsEntity } from './promoCampaigns.entity';

@Entity({ name: 'promo-campaign-bonus' })
export class PromoCampaignBonusEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => PromoCampaignsEntity,
    (promoCampaigns) => promoCampaigns.promoCampaignBonus,
  )
  @JoinColumn({ name: 'promoCampaignsId' })
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

  @Column({ default: 0, type: 'decimal', precision: 11, scale: 2 })
  discountAmount: number;
  // number of percent or money to be discount.

  @Column({
    nullable: true,
    default: null,
    type: 'decimal',
    precision: 11,
    scale: 2,
  })
  maximumAmount: number;
  // if discount type is percent then this is the maximum cash can be discount, 0 if unlimited.

  @Column({ nullable: true, default: null, type: 'integer' })
  quantity: number;
  // how many next product or receipt can be applied

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
