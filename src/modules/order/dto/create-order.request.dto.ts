import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsArray, IsPositive, IsInt } from 'class-validator';

export class Position {
  @ApiProperty({
    description: 'Product id',
    example: 1,
  })
  @IsNotEmpty()
  productId: number;

  @ApiProperty({
    description: 'Product count',
    example: 1,
  })
  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  count: number;
}

export class CreateOrderRequestDto {
  @ApiProperty({
    description: 'New order status',
    example: 1,
  })
  @IsNotEmpty()
  clientId: number;

  @ApiProperty({
    description: 'Order positions',
    type: [Position],
  })
  @IsArray()
  positions: Position[];
}
