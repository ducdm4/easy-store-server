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
import { SpaceUnitEntity } from './spaceUnit.entity';

@Entity({ name: 'spaces' })
export class SpaceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @ManyToOne(() => StoreEntity, (store) => store.spaces)
  store: StoreEntity;

  @OneToMany(() => SpaceUnitEntity, (spaceUnit) => spaceUnit.space)
  spaceUnits: SpaceUnitEntity[];

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
