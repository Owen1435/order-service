import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
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

@ApiTags('client')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: 200,
    description: 'Success login',
  })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() loginDto: ClientLoginRequestDto,
    @Res() response,
  ): Promise<void> {
    const token = await this.clientService.login(loginDto);
    response.cookie('jwt', token, {
      sameSite: 'none',
      secure: true,
    });
    response.end();
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
