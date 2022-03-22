import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderEntity } from '../../entity/order.entity';
import { OrderRepository } from './order.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, OrderRepository])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
