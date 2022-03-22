import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { RmqModule } from '../libs/common/rmq/rmq.module';
import { OrmModule } from '../libs/common/orm/orm.module';
import { ClientModule } from './modules/client/client.module';

@Module({
  imports: [ConfigModule.forRoot(), OrmModule, RmqModule, ClientModule],
  controllers: [AppController],
})
export class AppModule {}
