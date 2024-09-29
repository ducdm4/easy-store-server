import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { PhotoEntity } from './photo.entity';
import { PersonalInfoEntity } from './personalInfo.entity';
import { StoreEntity } from './store.entity';

@Entity({ name: 'employee-info' })
export class EmployeeInfoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: false })
  isActive: boolean;

  @OneToOne(() => PhotoEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'identityCardImage1Id',
    referencedColumnName: 'id',
  })
  identityCardImage1: PhotoEntity;

  @OneToOne(() => PhotoEntity, { cascade: ['soft-remove'] })
  @JoinColumn({ name: 'identityCardImage2Id', referencedColumnName: 'id' })
  identityCardImage2: PhotoEntity;

  @OneToOne(() => PersonalInfoEntity, { cascade: ['soft-remove'] })
  @JoinColumn({ name: 'personalInfoId', referencedColumnName: 'id' })
  personalInfo: PersonalInfoEntity;

  @Column({ nullable: true, type: 'date', default: null })
  joinedDate: string;

  @Column({ nullable: true, default: 0 })
  dayOffPerMonth: number;

  @Column({ nullable: true, default: null })
  salary: string;

  @ManyToOne(() => StoreEntity)
  store: StoreEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
