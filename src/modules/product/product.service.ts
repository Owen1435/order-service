import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AddProductRequestDto } from './dto/add.product.request.dto';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { RmqResponse } from '../../../libs/common/rmq/rmq.response';
import { Product } from '../../domain/product';

@Injectable()
export class ProductService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async add(addProductDto: AddProductRequestDto): Promise<string> {
    // @ts-ignore
    const data: RmqResponse<string> = await this.amqpConnection.request({
      exchange: 'amq.direct',
      routingKey: 'product.add.route',
      payload: addProductDto,
    });

    console.log(data);
    if (data.status === HttpStatus.CREATED) {
      return data.payload;
    }
    throw new HttpException(data.error.message, data.status);
  }

  async getAll(): Promise<Product[]> {
    // @ts-ignore
    const data: RmqResponse<Product[]> = await this.amqpConnection.request({
      exchange: 'amq.direct',
      routingKey: 'product.get.all.route',
    });

    console.log(data);
    if (data.status === HttpStatus.OK) {
      return data.payload;
    }
    throw new HttpException(data.error.message, data.status);
  }

  async getById(id: number): Promise<Product> {
    // @ts-ignore
    const data: RmqResponse<Product> = await this.amqpConnection.request({
      exchange: 'amq.direct',
      routingKey: 'product.get.by.id.route',
      payload: id,
    });

    console.log(data);
    if (data.status === HttpStatus.OK) {
      return data.payload;
    }
    throw new HttpException(data.error.message, data.status);
  }
}
