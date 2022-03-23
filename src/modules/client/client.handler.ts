import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { ClientRepository } from './client.repository';
import { RmqClientRegisteredResponseDto } from './dto/rmq-client-registered.response.dto';
import { Client } from '../../../libs/domain/order/client';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ClientHandler {
  constructor(private readonly clientRepository: ClientRepository) {}

  @RabbitSubscribe({
    exchange: 'amq.direct',
    routingKey: 'client.registered.route',
    queue: 'client.registered.queue',
  })
  async add(dto: RmqClientRegisteredResponseDto) {
    const client = plainToClass(Client, {
      id: dto.client.id,
      login: dto.client.login,
    });

    await this.clientRepository.save(client);
    console.log('add', client);
  }
}
