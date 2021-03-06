import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ClientEntity } from './client.entity';
import { PositionEntity } from './position.entity';

@Entity({ name: 'orders' })
export class OrderEntity extends BaseEntity {
  @Column({
    type: 'timestamp',
  })
  date: Date;

  @Column({
    type: 'varchar',
  })
  status: string;

  @Column({
    type: 'numeric',
  })
  price: number;

  @Column({
    type: 'numeric',
  })
  discount: number;

  @ManyToOne(() => ClientEntity, (client) => client.id)
  client: ClientEntity;

  @OneToMany(() => PositionEntity, (position) => position.order)
  positions: PositionEntity[];
}
