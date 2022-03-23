import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { RmqModule } from '../libs/common/rmq/rmq.module';
import { OrmModule } from '../libs/common/orm/orm.module';
import { ClientModule } from './modules/client/client.module';
import { ProductModule } from './modules/product/product.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    OrmModule,
    RmqModule,
    ClientModule,
    ProductModule,
    OrderModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
