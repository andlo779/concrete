import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddRecordRequest {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  artist: string;
  @ApiProperty({ type: String })
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
