import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export enum TextRedirection {
  LeftToRight = 'LeftToRight',
  RightToLeft = 'RightToLeft',
  TopToBottom = 'TopToBottom',
  BottomToTop = 'BottomToTop',
}

export class AnswerDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  answerId: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  answerName?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  icon?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  x?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  y?: number;

  @ApiProperty({ required: false, enum: TextRedirection })
  @IsOptional()
  textRenderDirection?: TextRedirection;

  @ApiProperty({ required: false, enum: TextRedirection })
  @IsOptional()
  outcomeRenderDirection?: TextRedirection;

  @ApiProperty()
  @IsString()
  @IsOptional()
  answerText?: string;
}
