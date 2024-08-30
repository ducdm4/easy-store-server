import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { PhotoEntity } from './photo.entity';
import { UserEntity } from './user.entity';
import { SpaceEntity } from './space.entity';

@Entity({ name: 'stores' })
export class StoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ default: 1 }) // 1: spa, 2: restaurant, 3: pet shop, 4: groceries, 5: pharmacy, 6: other
  type: number;

  @ManyToOne(() => UserEntity, (user) => user.stores)
  user: UserEntity;

  @Column({ select: false })
  @Exclude()
  passCode: string;

  @OneToMany(() => PhotoEntity, (photo) => photo.store)
  photos: PhotoEntity[]; // max 2 photos

  @OneToMany(() => SpaceEntity, (space) => space.store)
  spaces: SpaceEntity[];

  @OneToOne(() => PhotoEntity)
  @JoinColumn({ name: 'logoPictureId', referencedColumnName: 'id' })
  logoPicture: PhotoEntity;

  @Column({ default: 1 })
  paymentDate: number;

  @Column({ default: null })
  hotline: string;

  @Column({ default: null })
  facebookUrl: string;

  @Column({ default: null })
  tiktokUrl: string;

  @Column({ default: null })
  youtubeUrl: string;

  @Column({ default: null })
  address: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
