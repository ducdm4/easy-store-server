import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { StoreEntity } from './store.entity';
import { PromoCampaignBonusEntity } from './promoCampaignBonus.entity';
import { PromoCampaignConditionsEntity } from './promoCampaignConditions.entity';
import { PhotoEntity } from './photo.entity';

@Entity({ name: 'promo-campaigns' })
export class PromoCampaignsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, default: null })
  // name the promo campaign
  name: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ nullable: true, type: 'datetime', default: null })
  timeStart: Date;

  @Column({ nullable: true, type: 'datetime', default: null })
  timeEnd: Date;

  @OneToOne(() => PhotoEntity, {
    cascade: true,
  })
  @JoinColumn({ name: 'imageId', referencedColumnName: 'id' })
  image: PhotoEntity;

  @ManyToOne(() => StoreEntity)
  store: StoreEntity;

  @Column({ default: true })
  canUseWithOther: boolean; // can be use with other promo code or campaign

  @OneToMany(
    () => PromoCampaignConditionsEntity,
    (promoCampaignConditions) => promoCampaignConditions.promoCampaigns,
    {
      cascade: true,
    },
  )
  promoCampaignConditions: PromoCampaignConditionsEntity[];

  @OneToMany(
    () => PromoCampaignBonusEntity,
    (promoCampaignBonus) => promoCampaignBonus.promoCampaigns,
    {
      cascade: true,
    },
  )
  promoCampaignBonus: PromoCampaignBonusEntity[];

  @Column({ default: false })
  isPaused: boolean; // in case needed to pause the promo code

  @Column({ default: 0 })
  timesUsed: number;

  @Column({ default: false })
  isCumulative: boolean; // able to apply bonus multiple time when condition reach multiple time

  @Column({ default: 0 })
  expiryDate: number;
  // -1 mean this promotion must use in this receipt and can not use for next receipt
  // 0 is mean this promotion can be use for next receipt and never expire
  // >0 is mean this promotion can be use for next receipt and expire after n days

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
