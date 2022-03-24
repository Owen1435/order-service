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
import { ProductService } from './product.service';
import { AddProductRequestDto } from './dto/add.product.request.dto';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Product } from '../../../libs/domain/product/product';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Add product' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success message',
    type: String,
  })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @HttpCode(HttpStatus.CREATED)
  @Post('add')
  async add(@Body() addProductDto: AddProductRequestDto): Promise<string> {
    return this.productService.add(addProductDto);
  }

  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All products',
    type: [Product],
  })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @HttpCode(HttpStatus.OK)
  @Get('get')
  async getAll(): Promise<Product[]> {
    return this.productService.getAll();
  }

  @ApiOperation({ summary: 'Get product by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Product by id',
    type: Product,
  })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @HttpCode(HttpStatus.OK)
  @Get('get/:id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productService.getById(id);
  }
}
