import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ProductRepository } from './product.repository';
import { Product } from '../../../libs/domain/order-service/product';
import { RmqProductAddedResponseDto } from './dto/rmq-product-added.response.dto';
import { ProductEntity } from '../../entity/product.entity';

@Injectable()
export class ProductHandler {
  constructor(private readonly productRepository: ProductRepository) {}

  @RabbitSubscribe({
    exchange: 'product.added.exchange',
    routingKey: '',
    queue: 'product.added.queue.order-service',
  })
  async add(dto: RmqProductAddedResponseDto) {
    const product = plainToClass(ProductEntity, {
      id: dto.product.id,
      title: dto.product.title,
      price: dto.product.price,
    });

    await this.productRepository.save(product);
    console.log('add', product);
  }
}
