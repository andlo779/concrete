import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateRecordRequest {
  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  artist: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  productionYear: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  printedYear: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  imageUrl: string;
}
