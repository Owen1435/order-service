import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CalculateOrderPriceRequestDto } from './dto/calculate-order-price.request.dto';
import { ProductRepository } from '../product/product.repository';

@Injectable()
export class PriceService {
  constructor(private readonly productRepository: ProductRepository) {}

  async calculateOrderPrice(
    calcOrderPriceDto: CalculateOrderPriceRequestDto,
  ): Promise<number> {
    const discountCoefficient = 1 - calcOrderPriceDto.discount / 100;

    let sum = 0;
    for (const position of calcOrderPriceDto.positions) {
      const product = await this.productRepository.findOne(position.productId);
      if (!product) {
        throw new HttpException(
          `Product with id:${position.productId} was not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      sum += Number(product.price);
    }

    return sum * discountCoefficient;
  }
}
