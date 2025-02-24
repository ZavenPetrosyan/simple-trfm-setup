import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';

import {
  Champion,
  Difficulty,
  PuzzleState,
  PuzzleEditorRank,
  PuzzleEditorRole,
} from '../../entities/puzzle/puzzle.enum';

export class PuzzleJsonDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  createdDate?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  updatedDate?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  patch_version?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false, enum: PuzzleEditorRank })
  @IsOptional()
  rank?: PuzzleEditorRank;

  @ApiProperty({ required: false, enum: Champion })
  @IsOptional()
  champion?: Champion;

  @ApiProperty({ required: false, enum: PuzzleEditorRole })
  @IsOptional()
  role?: PuzzleEditorRole;

  @ApiProperty({ required: false, enum: Difficulty })
  @IsOptional()
  difficulty?: Difficulty;

  @ApiProperty()
  @IsOptional()
  issues?: any;

  @ApiProperty()
  @IsOptional()
  @IsString()
  author?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  videoFullVersion?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  videoCompiledVersion?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  previewImage?: string;

  @ApiProperty({ required: false, enum: PuzzleState })
  @IsOptional()
  state?: PuzzleState;

  @ApiProperty({ type: [String] })
  @IsOptional()
  @IsArray()
  puzzlePatterns?: string[];
}

export class UpdatePuzzleDto {
  @ApiProperty({ required: false, type: PuzzleJsonDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => PuzzleJsonDto)
  originalPuzzleJson?: PuzzleJsonDto;

  @ApiProperty({ required: false, type: PuzzleJsonDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => PuzzleJsonDto)
  puzzle?: PuzzleJsonDto;
}

export class UpdatePuzzleStatusDto {
  @ApiProperty({
    required: true,
    description: 'New status of the puzzle',
    enum: PuzzleState,
  })
  @IsString()
  state: PuzzleState;
}
