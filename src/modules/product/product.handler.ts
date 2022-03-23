import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ProductRepository } from './product.repository';
import { Product } from '../../../libs/domain/order/product';
import { RmqProductAddedResponseDto } from './dto/rmq-product-added.response.dto';

@Injectable()
export class ProductHandler {
  constructor(private readonly productRepository: ProductRepository) {}

  @RabbitSubscribe({
    exchange: 'amq.direct',
    routingKey: 'product.added.route',
    queue: 'product.added.queue',
  })
  async add(dto: RmqProductAddedResponseDto) {
    const product = plainToClass(Product, {
      id: dto.product.id,
      title: dto.product.title,
    });

    await this.productRepository.save(product);
    console.log('add', product);
  }
}
