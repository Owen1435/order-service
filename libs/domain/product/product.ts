import { ProductStatus } from './product-status';
import { ProductType } from './product-type';
import { Car } from './car';

export class Product {
  id: number;
  title: string;
  price: number;
  category: string;
  status: ProductStatus;
  type: ProductType;
  description: ProductDescription;
}

export type ProductDescription = Car;
