import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderEntity } from '../../entity/order.entity';
import { OrderRepository } from './order.repository';
import { ProductRepository } from '../product/product.repository';
import { ClientRepository } from '../client/client.repository';
import { PositionRepository } from './position.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      OrderRepository,
      ProductRepository,
      ClientRepository,
      PositionRepository,
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
