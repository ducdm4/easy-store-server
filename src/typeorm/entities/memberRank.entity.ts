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

  @Column({ nullable: true, default: 0, type: 'tinyint' })
  discount: number;

  @Column({ nullable: true, default: 0, type: 'tinyint' })
  condition: number; // 0: by total revenue, 1: by receipts, 2: by average avenue in x months

  @Column({ nullable: true, default: 0 })
  requirement1: number;

  @Column({ nullable: true, default: 0 })
  requirement2: number;

  @ManyToOne(() => StoreEntity)
  store: StoreEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
