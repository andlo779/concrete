import { Module } from '@nestjs/common';
import { HealthcheckController } from './healthcheck.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [HealthcheckController],
})
export class HealthcheckModule {}
