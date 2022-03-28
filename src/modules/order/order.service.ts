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
import { RmqResponse } from '../../../libs/common/rmq/rmq.response';
import { PriceService } from '../price/price.service';
import { PositionEntity } from '../../entity/position.entity';
import { DeepPartial } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    private readonly amqpConnection: AmqpConnection,
    private readonly orderRepository: OrderRepository,
    private readonly productRepository: ProductRepository,
    private readonly clientRepository: ClientRepository,
    private readonly positionRepository: PositionRepository,
    private readonly priceService: PriceService,
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
    const userDiscount = discountResponse.payload;

    const orderPrice = await this.priceService.calculateOrderPrice({
      positions: createDto.positions,
      discount: userDiscount,
    });
    const order = plainToClass(OrderEntity, {
      date: new Date(),
      status: 'default',
      price: orderPrice,
      discount: userDiscount,
      client,
    });
    const savedOrder = await this.orderRepository.save(order);

    const positions: DeepPartial<PositionEntity>[] = createDto.positions.map(
      (position) => ({
        count: position.count,
        product: { id: position.productId },
        order: { id: savedOrder.id },
      }),
    );
    await this.positionRepository.save(positions);

    // const order = await this.orderRepository.findOne(savedOrder.id, {
    //   relations: ['client', 'positions', 'positions.product'],
    // });

    this.amqpConnection.publish('order.created.exchange', '', savedOrder);

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
}
