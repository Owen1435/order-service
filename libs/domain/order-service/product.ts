import { ApiProperty } from '@nestjs/swagger';

export class Product {
  @ApiProperty({
    description: 'Product id',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Product title',
    example: 'Anything',
  })
  title: string;

  @ApiProperty({
    description: 'Product price',
    example: 12312,
  })
  price: number;
}
