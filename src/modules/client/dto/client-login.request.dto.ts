import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ClientLoginRequestDto {
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
}
