import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { StoreEntity } from './store.entity';
import { PromoCampaignBonusEntity } from './promoCampaignBonus.entity';
import { PromoCampaignConditionsEntity } from './promoCampaignConditions.entity';

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
