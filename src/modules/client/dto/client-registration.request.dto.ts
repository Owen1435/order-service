import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class ClientRegistrationRequestDto {
  @ApiProperty({
    description: 'User login',
    example: 'Sergey123',
  })
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    description: 'User password',
    example: 's13sda31s',
  })
  @IsNotEmpty()
  pass: string;

  @ApiProperty({
    description: 'User email',
    example: 'sergei@mail.ru',
  })
  @IsNotEmpty()
  @IsEmail()
  mail?: string;
}
