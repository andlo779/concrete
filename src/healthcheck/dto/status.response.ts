import { ApiProperty } from '@nestjs/swagger';

export enum Status {
  OK = 'OK',
  NOT_OK = 'NOT OK',
}

export class StatusResponse {
  @ApiProperty({ enum: Status })
  status: Status;

  constructor(status: Status) {
    this.status = status;
  }
}
