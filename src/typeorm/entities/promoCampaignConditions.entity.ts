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
import { MemberRankEntity } from './memberRank.entity';

@Entity({ name: 'promo-campaign-conditions' })
export class PromoCampaignConditionsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => PromoCampaignsEntity,
    (promoCampaigns) => promoCampaigns.promoCampaignConditions,
  )
  @JoinColumn({ name: 'promoCampaignsId' })
  promoCampaigns: PromoCampaignsEntity;

  // if product and combo and package are null, it will be the condition for all receipt
  @ManyToOne(() => ProductEntity)
  product: ProductEntity;

  @ManyToOne(() => ComboEntity)
  combo: ComboEntity;

  @ManyToOne(() => PackagesEntity)
  package: PackagesEntity;

  @ManyToOne(() => MemberRankEntity)
  memberRank: MemberRankEntity;

  @Column({ default: 0, type: 'decimal', precision: 11, scale: 2 })
  quantity: number; // number to reach the condition

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
