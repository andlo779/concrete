import { ApiProperty } from '@nestjs/swagger';

export class PingResponse {
  @ApiProperty({ type: String, enum: ['Pong'] })
  msg: string;

  constructor(msg: string) {
    this.msg = msg;
  }
}
