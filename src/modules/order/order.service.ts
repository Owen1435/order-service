import { Injectable } from '@nestjs/common';
import { CreateOrderRequestDto } from './dto/create-order.request.dto';

@Injectable()
export class OrderService {
  async create(createDto: CreateOrderRequestDto): Promise<string> {
    return '';
  }
}
