import { ApiProperty } from '@nestjs/swagger';

export class TokenResponse {
  @ApiProperty({
    type: String,
    description: 'JWT token.',
    example:
      'UshgdjksahUI.JUsdiy7dfdfJKdhnfjkdsncjkdjIsDJsajkhsdjsjiuHSDUIhs89HSh78dchs8.SNudihs78AYS',
  })
  access_token: string;
}
