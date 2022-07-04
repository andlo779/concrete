import { Controller, Get } from '@nestjs/common';

@Controller('healthcheck')
export class HealthcheckController {
  @Get('ping')
  ping() {
    return 'pong';
  }

  @Get('status')
  status() {
    return 'OK';
  }
}
