import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ChangeOrderStatusRequestDto {
  @ApiProperty({
    description: 'Order id',
    example: '1',
  })
  @IsNotEmpty()
  orderId: number;

  @ApiProperty({
    description: 'New order status',
    example: 'new',
  })
  @IsNotEmpty()
  status: string;
}
