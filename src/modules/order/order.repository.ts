import { EntityRepository, Repository } from 'typeorm';
import { OrderEntity } from '../../entity/order.entity';

@EntityRepository(OrderEntity)
export class OrderRepository extends Repository<OrderEntity> {}
