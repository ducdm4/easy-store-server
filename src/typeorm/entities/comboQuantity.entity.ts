import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ProductEntity } from './product.entity';
import { ComboEntity } from './combo.entity';

// combo quantity use to setting the number of products in a combo
@Entity({ name: 'combo-quantity' })
export class ComboQuantityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ComboEntity)
  combo: ComboEntity;

  @ManyToOne(() => ProductEntity)
  product: ProductEntity;

  @Column({ nullable: false })
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
