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
import { SPACE_UNIT_STATUS } from '../../common/constant';

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

  // 0: de-active, 1: available, 2: booked, 3: occupied, 4: merged
  @Column({ type: 'smallint', default: SPACE_UNIT_STATUS.AVAILABLE })
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
