import { ApiProperty } from '@nestjs/swagger';

export class MultipleErrorDto {
  @ApiProperty()
  statusCode: number;
  @ApiProperty({ type: String, isArray: true })
  message: string[];

  constructor(statusCode: number, message: string[]) {
    this.statusCode = statusCode;
    this.message = message;
  }
}
