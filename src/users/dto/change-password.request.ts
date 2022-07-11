import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordRequest {
  @ApiProperty({ type: String, example: 'old_password!' })
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @ApiProperty({ type: String, minLength: 8, example: 'new_password?' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  newPassword: string;
}
