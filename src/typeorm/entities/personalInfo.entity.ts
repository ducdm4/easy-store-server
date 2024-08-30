import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
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

  @Column({ unique: false })
  email: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  phone: string;

  @OneToOne(() => PhotoEntity)
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
