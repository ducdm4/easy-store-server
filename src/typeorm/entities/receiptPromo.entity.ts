import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { PromoCodeEntity } from './promoCode.entity';
import { ReceiptProductEntity } from './receiptProduct.entity';
import { PromoCampaignsEntity } from './promoCampaigns.entity';
import { ReceiptProductToppingEntity } from './receiptProductTopping.entity';
import { ReceiptEntity } from './receipt.entity';
import { PromoCampaignBonusEntity } from './promoCampaignBonus.entity';

@Entity({ name: 'receipt-promo' })
export class ReceiptPromoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ReceiptEntity)
  receipt: ReceiptEntity; // id of the receipt

  @ManyToOne(() => PromoCodeEntity)
  code: PromoCodeEntity;

  @ManyToOne(() => PromoCampaignsEntity)
  campaign: PromoCampaignsEntity;

  @ManyToOne(() => PromoCampaignBonusEntity)
  campaignBonus: PromoCampaignBonusEntity;

  @Column({ default: 0, type: 'decimal', precision: 11, scale: 2 })
  discountedAmount: number; // total discount in percent or money base on discountType

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
