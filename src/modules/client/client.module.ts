import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from 'src/entity/client.entity';
import { ClientRepository } from './client.repository';
import { ClientHandler } from './client.handler';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity, ClientRepository])],
  providers: [ClientService, ClientHandler],
  controllers: [ClientController],
})
export class ClientModule {}
