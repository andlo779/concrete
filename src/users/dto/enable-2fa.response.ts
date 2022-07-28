import { ApiProperty } from '@nestjs/swagger';

export class Enable2faResponse {
  @ApiProperty()
  secret: string;
  @ApiProperty()
  qrcode: string;
}
