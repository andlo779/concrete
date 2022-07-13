import { RecordResponse } from './record.response';
import { ApiProperty } from '@nestjs/swagger';

export class RecordsCollectionResponse {
  @ApiProperty({ type: String })
  id: string;
  @ApiProperty({ type: String })
  name: string;
  @ApiProperty({ type: String })
  userId: string;
  @ApiProperty({ type: RecordResponse, isArray: true })
  records: Array<RecordResponse>;
}
