import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ClientLoginRequestDto } from './dto/client-login.request.dto';
import { ClientRegistrationRequestDto } from './dto/client-registration.request.dto';
import { RmqResponse } from '../../../libs/common/rmq/rmq.response';
import { RmqClientLoginResponseDto } from './dto/rmq-client-login.response.dto';

@Injectable()
export class ClientService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async login(
    loginDto: ClientLoginRequestDto,
  ): Promise<RmqClientLoginResponseDto> {
    // @ts-ignore
    const data: RmqResponse<RmqClientLoginResponseDto> =
      await this.amqpConnection.request({
        exchange: 'amq.direct',
        routingKey: 'client.login.route',
        payload: loginDto,
      });

    if (data.status === HttpStatus.OK) {
      return data.payload;
    }
    throw new HttpException(data.error.message, data.status);
  }

  async register(registerDto: ClientRegistrationRequestDto): Promise<string> {
    // @ts-ignore
    const data: RmqResponse<string> = await this.amqpConnection.request({
      exchange: 'amq.direct',
      routingKey: 'client.register.route',
      payload: registerDto,
    });

    if (data.status === HttpStatus.CREATED) {
      return data.payload;
    }
    throw new HttpException(data.error.message, data.status);
  }
}
