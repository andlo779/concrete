import { ApiProperty } from '@nestjs/swagger';
import { CONDITION } from './add-record.request';

export class RecordResponse {
  @ApiProperty({ type: String })
  id: string;
  @ApiProperty({ type: String })
  artist: string;
  @ApiProperty({ type: String })
  name: string;
  @ApiProperty({ type: String, example: '1975' })
  productionYear: string;
  @ApiProperty({ type: String, example: '1975' })
  printedYear: string;
  @ApiProperty({ type: String })
  imageUrl: string;
  @ApiProperty({ type: String, enum: CONDITION })
  condition: CONDITION;
  @ApiProperty({ type: Date })
  addedAt: Date;
}
