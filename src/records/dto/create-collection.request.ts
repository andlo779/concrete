import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCollectionRequest {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  userId: string;
}
