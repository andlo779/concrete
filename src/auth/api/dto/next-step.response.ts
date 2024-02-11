import { ApiProperty } from '@nestjs/swagger';

export enum AuthSteps {
  TOTP = 'TOTP',
  BASIC = 'BASIC',
}

export class NextStepResponse {
  @ApiProperty({
    type: AuthSteps,
    enum: AuthSteps,
  })
  nextStep: AuthSteps;
  @ApiProperty({ type: String, example: '1234-12345678-5678' })
  sessionId: string;
}
