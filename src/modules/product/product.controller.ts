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
import { Product } from '../../domain/product';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Add product' })
  @ApiResponse({
    status: 200,
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
    status: 200,
    description: 'All products',
    type: [Product],
  })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @HttpCode(HttpStatus.OK)
  @Get('get-all')
  async getAll(): Promise<Product[]> {
    return this.productService.getAll();
  }

  @ApiOperation({ summary: 'Get product by id' })
  @ApiResponse({
    status: 200,
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
