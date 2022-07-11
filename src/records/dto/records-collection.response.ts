import { RecordsInCollectionResponse } from './records-in-collection.response';
import { ApiProperty } from '@nestjs/swagger';

export class RecordsCollectionResponse {
  @ApiProperty({ type: String })
  id: string;
  @ApiProperty({ type: String })
  userId: string;
  @ApiProperty({ type: RecordsInCollectionResponse, isArray: true })
  records: Array<RecordsInCollectionResponse>;
}
