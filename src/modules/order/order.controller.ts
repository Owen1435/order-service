import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('add')
  async create(@Body() createDto) {}

  @Get('get-all')
  async getAll() {}

  @Get('get/:id')
  async getById(@Param('id', ParseIntPipe) id: number) {}
}
