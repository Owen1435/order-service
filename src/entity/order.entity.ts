import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'orders' })
export class OrderEntity extends BaseEntity {
  @Column({
    type: 'timestamp',
  })
  date: Date;
}
