import { ApiProperty } from '@nestjs/swagger';

export enum AuthSteps {
  '2FA' = '2FA',
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
