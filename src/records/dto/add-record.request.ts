import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddRecordRequest {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  artist: string;
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({ type: String })
  @IsString()
  productionYear: string;
  @ApiProperty({ type: String })
  @IsString()
  printedYear: string;
  @ApiProperty({ type: String })
  @IsString()
  imageUrl: string;
}
