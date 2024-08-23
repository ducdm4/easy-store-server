import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { SpaceEntity } from './space.entity';

@Entity({ name: 'space-units' })
export class SpaceUnitEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @ManyToOne(() => SpaceEntity, (space) => space.spaceUnits)
  space: SpaceEntity;

  @Column({ default: true })
  active: boolean;

  @Column({ type: 'smallint', default: 1 }) // 0: de-active, 1: available, 2: booked, 3: occupied, 4: merged
  status: number;

  @ManyToMany(() => SpaceUnitEntity)
  @JoinTable()
  mergedUnit: SpaceUnitEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
