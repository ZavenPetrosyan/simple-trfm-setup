import { IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePuzzleResponseDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsBoolean()
  success?: true;

  @ApiProperty()
  @IsString()
  uploadUrl: string;
}

export class UpdatePuzzleResponseDto {
  @ApiProperty({ required: true })
  @IsBoolean()
  success: boolean;
}
