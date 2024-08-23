import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { PersonalInfoEntity } from './personalInfo.entity';
import { StoreEntity } from './store.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ select: false })
  @Exclude()
  password: string;

  @Column({ default: 1 })
  role: number;

  @OneToOne(() => PersonalInfoEntity)
  @JoinColumn({ name: 'personalInfoId', referencedColumnName: 'id' })
  personalInfo: PersonalInfoEntity;

  @OneToMany(() => StoreEntity, (store) => store.user)
  stores: StoreEntity[];

  @Column({ default: null, select: false })
  notificationToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
