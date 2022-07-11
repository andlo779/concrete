import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PingResponse } from './dto/ping.response';
import { Status, StatusResponse } from './dto/status.response';

@ApiTags('healthcheck')
@Controller('healthcheck')
export class HealthcheckController {
  @ApiOkResponse({ type: PingResponse })
  @Get('ping')
  async ping(): Promise<PingResponse> {
    return new PingResponse('pong');
  }

  @ApiOkResponse({ type: StatusResponse })
  @Get('status')
  async status(): Promise<StatusResponse> {
    return new StatusResponse(Status.OK);
  }
}
