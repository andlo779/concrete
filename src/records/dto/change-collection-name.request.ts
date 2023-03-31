import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChangeCollectionNameRequest {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  newName: string;
}
