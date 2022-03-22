import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { AddProductRequestDto } from './dto/add.product.request.dto';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  @Post('add')
  async add(@Body() body: AddProductRequestDto) {
    const data: any = await this.amqpConnection.request({
      exchange: 'amq.direct',
      routingKey: 'product.add.route',
      payload: body,
    });

    console.log(data.error);
    if (data.status === HttpStatus.CREATED) {
      return data.payload;
    }
    throw new HttpException(data.error.message, data.status);
  }

  @Get('get-all')
  async getAll() {
    const data: any = await this.amqpConnection.request({
      exchange: 'amq.direct',
      routingKey: 'product.get.all.route',
    });

    console.log(data);
    if (data.status === HttpStatus.OK) {
      return data.payload;
    }
    throw new HttpException(data.error.message, data.status);
  }

  @Get('get/:id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    const data: any = await this.amqpConnection.request({
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
