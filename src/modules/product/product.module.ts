import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../../entity/product.entity';
import { ProductHandler } from './product.handler';
import { ProductRepository } from './product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, ProductRepository])],
  providers: [ProductService, ProductHandler],
  controllers: [ProductController],
})
export class ProductModule {}
