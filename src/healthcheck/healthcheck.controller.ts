import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('healthcheck')
export class HealthcheckController {
  @Get('ping')
  ping() {
    return 'pong';
  }

  @UseGuards(JwtAuthGuard)
  @Get('status')
  status() {
    return 'OK';
  }
}
