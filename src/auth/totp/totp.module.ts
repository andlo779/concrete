import { Module } from '@nestjs/common';
import { TotpService } from './totp.service';

@Module({
  providers: [TotpService],
  exports: [TotpService],
})
export class TotpModule {}
