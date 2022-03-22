import { ApiProperty } from '@nestjs/swagger';

export class ClientLoginResponseDto {
  @ApiProperty({
    description: 'Access token',
    example:
      'eyJhbGciOiJI5cCI6IkpXVCJ9.eyJsb2dpbi2NDgwMzc2Njd9.B6DX4C1AQAQkwjb4ShjNyF52CaZSH2Qwd',
  })
  token: string;
}
