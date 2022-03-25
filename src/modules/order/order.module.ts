import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderEntity } from '../../entity/order.entity';
import { OrderRepository } from './order.repository';
import { ProductRepository } from '../product/product.repository';
import { ClientRepository } from '../client/client.repository';
import { PositionRepository } from './position.repository';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '../../../libs/common/jwt/jwt.config';
import { PriceModule } from '../price/price.module';

@Module({
  imports: [
    JwtModule.register(jwtConfig),
    TypeOrmModule.forFeature([
      OrderEntity,
      OrderRepository,
      ProductRepository,
      ClientRepository,
      PositionRepository,
    ]),
    PriceModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
