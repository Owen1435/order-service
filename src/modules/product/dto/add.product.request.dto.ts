import { ProductType } from 'src/domain/product-type';

export class AddProductRequestDto {
  title: string;
  price: number;
  type: ProductType;
  status: string;
  description?: string;
}
