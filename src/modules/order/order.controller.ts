import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderRequestDto } from './dto/create-order.request.dto';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ChangeOrderStatusRequestDto } from './dto/change-order-status.request.dto';
import { OrderEntity } from '../../entity/order.entity';
import { GetJwtDecorator } from '../../../libs/common/decorators/get-jwt.decorator';
import { ClientJwtRequestDto } from './dto/client-jwt.request.dto';
import { AuthGuard } from '../../../libs/common/guards/auth.guard';
import { Roles } from 'libs/common/decorators/roles-auth.decorator';
import { RolesGuard } from 'libs/common/guards/roles.guard';

@UseGuards(AuthGuard)
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
  async create(
    @Body() createDto: CreateOrderRequestDto,
    @GetJwtDecorator() client: ClientJwtRequestDto,
  ): Promise<string> {
    return this.orderService.create(createDto, client.id);
  }

  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All orders',
    type: [OrderEntity],
  })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @HttpCode(HttpStatus.OK)
  @Get('get')
  async getAll(
    @GetJwtDecorator() client: ClientJwtRequestDto,
  ): Promise<OrderEntity[]> {
    return this.orderService.getAll(client.id);
  }

  @ApiOperation({ summary: 'Get order by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Order',
    type: OrderEntity,
  })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @Get('get/:id')
  async getById(
    @Param('id', ParseIntPipe) orderId: number,
    @GetJwtDecorator() client: ClientJwtRequestDto,
  ): Promise<OrderEntity> {
    return this.orderService.getById(orderId, client.id);
  }

  @ApiOperation({ summary: 'Change status' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success message',
    type: String,
  })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @HttpCode(HttpStatus.OK)
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post('change-status')
  async changeStatus(
    @Body() changeStatusDto: ChangeOrderStatusRequestDto,
  ): Promise<string> {
    return this.orderService.changeStatus(changeStatusDto);
  }
}
