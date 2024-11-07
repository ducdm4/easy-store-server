import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PersonalInfoEntity } from './personalInfo.entity';
import { MemberRankEntity } from './memberRank.entity';
import { StoreEntity } from './store.entity';

@Entity({ name: 'customers' })
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => PersonalInfoEntity)
  @JoinColumn({ name: 'personalInfoId', referencedColumnName: 'id' })
  personalInfo: PersonalInfoEntity;

  @Column({ nullable: true, type: 'date', default: null })
  joinedDate: string;

  @ManyToOne(() => MemberRankEntity)
  @JoinColumn({ name: 'rankId', referencedColumnName: 'id' })
  rank: MemberRankEntity;

  @Column({ type: 'integer', default: 0 })
  point: number; //TODO: need config in store to define how many revenue to get 1 point

  @ManyToOne(() => StoreEntity)
  store: StoreEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
