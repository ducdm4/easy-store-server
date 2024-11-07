import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { StoreEntity } from './store.entity';

@Entity({ name: 'member-ranks' })
export class MemberRankEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, default: null })
  name: string;

  @Column({ nullable: true, default: null })
  description: string;

  @Column({ nullable: true, default: 0, type: 'tinyint' })
  condition: number; // 0: by total revenue, 1: by receipts

  @Column({ nullable: true, default: 0 })
  requirement: number; // number of receipts or revenue to meet the rank

  @Column({ default: 0 })
  dropRankInMonth: number; // number of time (in month) to drop the rank, 0: never drop

  @ManyToOne(() => StoreEntity)
  store: StoreEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
