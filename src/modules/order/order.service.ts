import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateOrderRequestDto,
  Position,
} from './dto/create-order.request.dto';
import { OrderRepository } from './order.repository';
import { ProductRepository } from '../product/product.repository';
import { ClientRepository } from '../client/client.repository';
import { OrderEntity } from '../../entity/order.entity';
import { PositionRepository } from './position.repository';
import { ChangeOrderStatusRequestDto } from './dto/change-order-status.request.dto';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { plainToClass } from 'class-transformer';
import { RmqResponse } from '../../../libs/common/rmq/rmq.response';

@Injectable()
export class OrderService {
  constructor(
    private readonly amqpConnection: AmqpConnection,
    private readonly orderRepository: OrderRepository,
    private readonly productRepository: ProductRepository,
    private readonly clientRepository: ClientRepository,
    private readonly positionRepository: PositionRepository,
  ) {}

  async create(
    createDto: CreateOrderRequestDto,
    clientId: number,
  ): Promise<string> {
    const client = await this.clientRepository.findOne(clientId);
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

    // @ts-ignore
    const discountResponse: RmqResponse<number> =
      await this.amqpConnection.request({
        exchange: 'amq.direct',
        routingKey: 'client.get.discount.route',
        payload: client.id,
      });
    const discount = discountResponse.payload;

    const orderPrice = await this.calculateOrderPrice(
      discount,
      createDto.positions,
    );
    const order = plainToClass(OrderEntity, {
      date: new Date(),
      status: 'default',
      price: orderPrice,
      discount,
      client,
    });
    const savedOrder = await this.orderRepository.save(order);

    //todo
    for (const position of createDto.positions) {
      await this.positionRepository.save({
        order: savedOrder,
        product: { id: position.productId },
        count: position.count,
      });
    }

    this.amqpConnection.publish('order.created.exchange', '', client.id);

    return 'Order created';
  }

  async getAll(clientId: number): Promise<OrderEntity[]> {
    return await this.orderRepository.find({
      relations: ['client', 'positions', 'positions.product'],
      where: {
        client: {
          id: clientId,
        },
      },
    });
  }

  async getById(orderId: number, clientId: number) {
    return await this.orderRepository.findOne(orderId, {
      relations: ['client', 'positions', 'positions.product'],
      where: {
        client: {
          id: clientId,
        },
      },
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

  private async calculateOrderPrice(
    discount: number,
    positions: Position[],
  ): Promise<number> {
    const discountCoefficient = 1 - discount / 100;

    let sum = 0;
    for (const position of positions) {
      const product = await this.productRepository.findOne(position.productId);
      sum += Number(product.price);
    }

    return sum * discountCoefficient;
  }
}
