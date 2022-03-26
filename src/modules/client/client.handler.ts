import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { ClientRepository } from './client.repository';
import { RmqClientRegisteredResponseDto } from './dto/rmq-client-registered.response.dto';
import { Client } from '../../../libs/domain/order-service/client';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ClientHandler {
  constructor(private readonly clientRepository: ClientRepository) {}

  @RabbitSubscribe({
    exchange: 'client.registered.exchange',
    routingKey: '',
    queue: 'client.registered.queue.order-service',
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
