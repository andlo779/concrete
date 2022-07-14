import { ApiProperty } from '@nestjs/swagger';

export enum Status {
  OK = 'OK',
  NOT_OK = 'NOT OK',
}

export class IntegrationStatus {
  @ApiProperty({ type: String, example: 'db' })
  name: string;
  @ApiProperty({ enum: Status })
  status: Status;

  constructor(name: string) {
    this.name = name;
    this.status = Status.NOT_OK;
  }
}

export class StatusResponse {
  @ApiProperty({ enum: Status })
  appStatus: Status;

  @ApiProperty({ type: IntegrationStatus, isArray: true })
  integrations: Array<IntegrationStatus>;

  constructor() {
    this.appStatus = Status.NOT_OK;
    this.integrations = new Array<IntegrationStatus>();
  }
}
