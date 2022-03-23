import { Column, Entity, ManyToOne } from 'typeorm';
import { ProductEntity } from './product.entity';
import { OrderEntity } from './order.entity';
import { BaseEntity } from './base.entity';

@Entity({ name: 'positions' })
export class PositionEntity extends BaseEntity {
  @Column({
    type: 'int',
  })
  count: number;

  @ManyToOne(() => OrderEntity, (order) => order.id)
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.id)
  product: ProductEntity;
}
