import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderRequestDto } from './dto/create-order.request.dto';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Order } from '../../../libs/domain/order/order';
import { ChangeOrderStatusRequestDto } from './dto/change-order-status.request.dto';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Create order' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success message',
    type: String,
  })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  async create(@Body() createDto: CreateOrderRequestDto): Promise<string> {
    return this.orderService.create(createDto);
  }

  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All orders',
    type: [Order],
  })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @HttpCode(HttpStatus.OK)
  @Get('get-all')
  async getAll(): Promise<Order[]> {
    return null;
    // return this.orderService.getAll();
  }

  @ApiOperation({ summary: 'Get order by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Order',
    type: Order,
  })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @Get('get/:id')
  async getById(@Param('id', ParseIntPipe) orderId: number): Promise<Order> {
    return null;
    // return this.orderService.getById(orderId);
  }

  @ApiOperation({ summary: 'Change status' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success message',
    type: String,
  })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @HttpCode(HttpStatus.OK)
  @Post('change-status')
  async changeStatus(
    @Body() changeStatusDto: ChangeOrderStatusRequestDto,
  ): Promise<string> {
    return null;
    // return this.orderService.changeStatus(changeStatusDto);
  }
}
