import { ApiProperty } from '@nestjs/swagger';

export class Car {
  @ApiProperty()
  brand: string;
  @ApiProperty()
  model: string;
  @ApiProperty()
  vin?: string;
  @ApiProperty()
  mileage?: number;
  @ApiProperty()
  releaseDate?: Date;
  @ApiProperty()
  color?: string; //todo enum
  @ApiProperty()
  bodyType?: string; //todo: enum
  @ApiProperty()
  engineType?: string; //todo: enum
}
