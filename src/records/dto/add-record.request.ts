import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum CONDITION {
  M = 'Mint',
  NM = 'Near Mint',
  'VG+' = 'Very Good Plus',
  VG = 'Very Good',
  'G+' = 'Good Plus',
  G = 'Good',
  P = 'Poor',
}
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
  @ApiProperty({ type: String, enum: CONDITION })
  @IsEnum(CONDITION)
  condition: CONDITION;
}
