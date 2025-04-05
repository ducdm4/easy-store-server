import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PhotoEntity } from './photo.entity';

@Entity({ name: 'personal-info' })
export class PersonalInfoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, unique: false, default: '' })
  email: string;

  @Index()
  @Column({ nullable: true, default: null })
  firstName: string;

  @Index()
  @Column({ nullable: true, default: null })
  lastName: string;

  @Index()
  @Column({ nullable: true })
  phone: string;

  @OneToOne(() => PhotoEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'profilePictureId', referencedColumnName: 'id' })
  profilePicture: PhotoEntity;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true, type: 'date', default: null })
  dob: string;

  @Column({ default: true })
  gender: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
