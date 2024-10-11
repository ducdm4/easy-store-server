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
import { ProductEntity } from './product.entity';
import { ComboEntity } from './combo.entity';
import { ComboProductToppingEntity } from './comboProductTopping.entity';

// combo quantity use to setting the number of products in a combo
@Entity({ name: 'combo-quantity' })
export class ComboQuantityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ComboEntity)
  combo: ComboEntity;

  @ManyToOne(() => ProductEntity)
  productUsed: ProductEntity; // product in the combo

  @Column({ nullable: false })
  quantity: number;

  @OneToMany(
    () => ComboProductToppingEntity,
    (comboProductTopping) => comboProductTopping.comboQuantity,
    {
      cascade: true,
    },
  )
  toppingQuantity: ComboProductToppingEntity[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt?: Date;
}
