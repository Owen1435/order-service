import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderRequestDto } from './dto/create-order.request.dto';
import { OrderRepository } from './order.repository';
import { ProductRepository } from '../product/product.repository';
import { ClientRepository } from '../client/client.repository';
import { OrderEntity } from '../../entity/order.entity';
import { PositionRepository } from './position.repository';
import { ChangeOrderStatusRequestDto } from './dto/change-order-status.request.dto';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { plainToClass } from 'class-transformer';

@Injectable()
export class OrderService {
  constructor(
    private readonly amqpConnection: AmqpConnection,
    private readonly orderRepository: OrderRepository,
    private readonly productRepository: ProductRepository,
    private readonly clientRepository: ClientRepository,
    private readonly positionRepository: PositionRepository,
  ) {}

  async create(createDto: CreateOrderRequestDto): Promise<string> {
    const client = await this.clientRepository.findOne(createDto.clientId);
    if (!client) {
      throw new HttpException('Client was not found', HttpStatus.NOT_FOUND);
    }

    for (const position of createDto.positions) {
      const product = await this.productRepository.findOne(position.productId);
      if (!product) {
        throw new HttpException(
          `Product with id:${position.productId} was not found`,
          HttpStatus.NOT_FOUND,
        );
      }
    }

    const order = plainToClass(OrderEntity, {
      date: new Date(),
      status: 'default',
      client,
    });

    const savedOrder = await this.orderRepository.save(order);

    //todo
    createDto.positions.forEach((position) => {
      this.positionRepository.save({
        order: savedOrder,
        product: { id: position.productId },
        count: position.count,
      });
    });

    this.amqpConnection.publish('order.created.exchange', '', client.id);

    return 'Order created';
  }

  async getAll(): Promise<OrderEntity[]> {
    return await this.orderRepository.find({
      relations: ['client', 'positions', 'positions.product'],
    });
  }

  async getById(orderId: number) {
    return await this.orderRepository.findOne(orderId, {
      relations: ['client', 'positions', 'positions.product'],
    });
  }

  async changeStatus(changeStatusDto: ChangeOrderStatusRequestDto) {
    const order = await this.orderRepository.findOne(changeStatusDto.orderId);
    if (!order) {
      throw new HttpException(`Order was not found`, HttpStatus.NOT_FOUND);
    }

    await this.orderRepository.update(changeStatusDto.orderId, {
      status: changeStatusDto.status,
    });

    return 'Order status changed';
  }
}
