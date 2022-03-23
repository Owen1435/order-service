import { ProductTypeEnum } from '../../../../libs/domain/enum/product-type.enum';
import { ProductStatusEnum } from '../../../../libs/domain/enum/product-status.enum';
import { IsNotEmpty, IsEnum, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProductDescription } from '../../../../libs/domain/product/product';

export class AddProductRequestDto {
  @ApiProperty({
    description: 'Product title',
    example: 'BMW e46',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Product price',
    example: '5000',
  })
  @IsNotEmpty()
  @IsPositive()
  price: number;

  @ApiProperty({
    description: 'Product type',
    example: 'car',
  })
  @IsEnum(ProductTypeEnum)
  type: ProductTypeEnum;

  @ApiProperty({
    description: 'Product status',
    example: 'default',
  })
  @IsEnum(ProductStatusEnum)
  status: ProductStatusEnum;

  @ApiProperty({
    description: 'Product description',
    example: '{"color": "black"}',
  })
  description?: ProductDescription;
}
