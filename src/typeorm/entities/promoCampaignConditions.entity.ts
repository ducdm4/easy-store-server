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

@Entity({ name: 'promo-campaign-conditions' })
export class PromoCampaignConditionsEntity {
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

  @Column({ default: 0, type: 'decimal', precision: 5, scale: 2 })
  quantity: number; // number to reach the condition

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
