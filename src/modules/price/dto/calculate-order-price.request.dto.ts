import { Position } from '../../order/dto/create-order.request.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class CalculateOrderPriceRequestDto {
  @ApiProperty({
    description: 'Discount percent',
    example: 5,
  })
  @IsNotEmpty()
  discount: number;

  @ApiProperty({
    description: 'Positions',
    example: [
      {
        productId: 1,
        count: 1,
      },
    ],
    type: [Position],
  })
  @IsNotEmpty()
  @IsArray()
  positions: Position[];
}
