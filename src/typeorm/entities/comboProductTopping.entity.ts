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
import { ComboQuantityEntity } from './comboQuantity.entity';

@Entity({ name: 'combo-product-topping' })
export class ComboProductToppingEntity {
  // to store the topping info of a product in a combo
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ComboQuantityEntity)
  comboQuantity: ComboQuantityEntity;

  @ManyToOne(() => ProductEntity)
  product: ProductEntity; // id of topping product

  @Column({ default: 1, type: 'decimal', precision: 5, scale: 1 })
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt: Date;
}
