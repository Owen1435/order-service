import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ClientService } from './client.service';
import { ClientLoginRequestDto } from './dto/client-login.request.dto';
import { ClientRegistrationRequestDto } from './dto/client-registration.request.dto';
import { ClientLoginResponseDto } from './dto/client-login.response.dto';

@ApiTags('client')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: 200,
    description: 'Success login',
    type: ClientLoginResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() loginDto: ClientLoginRequestDto,
  ): Promise<ClientLoginResponseDto> {
    return this.clientService.login(loginDto);
  }

  @ApiOperation({ summary: 'Registration' })
  @ApiResponse({
    status: 201,
    description: 'Success registration',
    type: String,
  })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(
    @Body() registerDto: ClientRegistrationRequestDto,
  ): Promise<string> {
    return this.clientService.register(registerDto);
  }
}
