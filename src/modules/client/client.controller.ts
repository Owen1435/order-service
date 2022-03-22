import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientLoginRequestDto } from './dto/client-login.request.dto';
import { ClientRegistrationRequestDto } from './dto/client-registration.request.dto';

@Controller('client')
export class ClientController {
  constructor(
    private readonly clientService: ClientService,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  @Post('login')
  async login(@Body() body: ClientLoginRequestDto) {
    const data: any = await this.amqpConnection.request({
      exchange: 'amq.direct',
      routingKey: 'client.login.route',
      payload: body,
    });

    console.log(data);
    if (data.status === HttpStatus.OK) {
      return data.payload;
    }
    throw new HttpException(data.error.message, data.status);
  }

  @Post('register')
  async register(@Body() body: ClientRegistrationRequestDto) {
    const data: any = await this.amqpConnection.request({
      exchange: 'amq.direct',
      routingKey: 'client.register.route',
      payload: body,
    });

    console.log(data);
    if (data.status === HttpStatus.CREATED) {
      return data.payload;
    }
    throw new HttpException(data.error.message, data.status);
  }
}
