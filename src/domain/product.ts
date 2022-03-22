import { ProductStatus } from './product-status';
import { ProductType } from './product-type';

export class Product {
  id: number;
  title: string;
  description: object;
  price: number;
  status: ProductStatus;
  type: ProductType;
  childCategory: string;
  parentCategory: string;
}
