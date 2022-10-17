import { ApiProperty } from '@nestjs/swagger';

export class SimpleErrorDto {
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  message: string;

  constructor(statusCode: number, message: string) {
    this.statusCode = statusCode;
    this.message = message;
  }
}
