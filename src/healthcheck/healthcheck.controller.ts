import { Controller, Get, Logger } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PingResponse } from './dto/ping.response';
import { Status, StatusResponse } from './dto/status.response';
import { DbStatusService } from './db-status.service';

@ApiTags('healthcheck')
@Controller('healthcheck')
export class HealthcheckController {
  logger = new Logger(HealthcheckController.name);
  constructor(private readonly dbStatusService: DbStatusService) {}

  @ApiOkResponse({ type: PingResponse })
  @Get('ping')
  async ping(): Promise<PingResponse> {
    return new PingResponse('pong');
  }

  @ApiOkResponse({ type: StatusResponse })
  @Get('status')
  async status(): Promise<StatusResponse> {
    const response = new StatusResponse();
    if (await this.dbStatusService.isDbUp()) {
      response.integrations.push({ name: 'db', status: Status.OK });
    } else {
      response.integrations.push({ name: 'db', status: Status.NOT_OK });
    }

    if (this.isEverythingOk(response)) {
      response.appStatus = Status.OK;
    }
    return response;
  }

  private isEverythingOk(statuses: StatusResponse): boolean {
    return statuses.integrations.every((s) => s.status === Status.OK);
  }
}
