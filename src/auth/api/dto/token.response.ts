import { ApiProperty } from '@nestjs/swagger';

export class TokenResponse {
  @ApiProperty({
    type: String,
    description: 'JWT auth token.',
    example:
      'UshgdjksahUI.JUsdiy7dfdfJKdhnfjkdsncjkdjIsDJsajkhsdjsjiuHSDUIhs89HSh78dchs8.SNudihs78AYS',
  })
  accessToken: string;

  @ApiProperty({
    type: String,
    description: 'JWT refresh token.',
    example:
      'UshgdjksahUI.JUsdiy7dfdfJKdhnfjkdsncjkdjIsDJsajkhsdjsjiuHSDUIhs89HSh78dchs8.SNudihs78AYS',
  })
  refreshToken: string;
}
