import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderRequestDto } from './dto/create-order.request.dto';
import { OrderRepository } from './order.repository';
import { ProductRepository } from '../product/product.repository';
import { ClientRepository } from '../client/client.repository';
import { OrderEntity } from '../../entity/order.entity';
import { PositionRepository } from './position.repository';

@Injectable()
export class OrderService {
  constructor(
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

    for (const productId of createDto.productIds) {
      const product = await this.productRepository.findOne(productId);
      if (!product) {
        throw new HttpException(
          `Product with id:${productId} was not found`,
          HttpStatus.NOT_FOUND,
        );
      }
    }

    const order = new OrderEntity();
    order.date = new Date();
    order.client = client;

    const savedOrder = await this.orderRepository.save(order);

    //todo
    createDto.productIds.forEach((productId) => {
      this.positionRepository.save({
        order: savedOrder,
        product: { id: productId },
        count: 1,
      });
    });

    return 'Ssdfadsfs';
  }

  // const orders = await this.orderRepository.find({
  //   relations: ['client', 'positions', 'positions.product'],
  // });
}
