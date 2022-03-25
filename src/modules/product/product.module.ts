import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../../entity/product.entity';
import { ProductHandler } from './product.handler';
import { ProductRepository } from './product.repository';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '../../../libs/common/jwt/jwt.config';

@Module({
  imports: [
    JwtModule.register(jwtConfig),
    TypeOrmModule.forFeature([ProductEntity, ProductRepository]),
  ],
  providers: [ProductService, ProductHandler],
  controllers: [ProductController],
})
export class ProductModule {}
