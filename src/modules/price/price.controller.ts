import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../../../libs/common/guards/auth.guard';
import { PriceService } from './price.service';
import { CalculateOrderPriceRequestDto } from './dto/calculate-order-price.request.dto';

@UseGuards(AuthGuard)
@ApiTags('price')
@Controller('price')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @ApiOperation({ summary: 'Calculate order price' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Calculated price',
    type: Number,
  })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @HttpCode(HttpStatus.OK)
  @Post('calculate')
  async calculateOrderPrice(
    @Body() calcOrderPriceDto: CalculateOrderPriceRequestDto,
  ): Promise<number> {
    return this.priceService.calculateOrderPrice(calcOrderPriceDto);
  }
}
