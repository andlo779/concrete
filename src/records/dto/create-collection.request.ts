import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCollectionRequest {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  userId: string;
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  name: string;
}
