import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AnswerDto } from './answerDto';

export enum IssueTypes {
  VideoIssue = 'videoIssue',
  PictureIssue = 'pictureIssue',
}

export class IssueDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  issueId?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  issueName?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  questionText?: string;

  @ApiProperty({ required: false, enum: IssueTypes })
  @IsOptional()
  type?: IssueTypes;

  @ApiProperty()
  @IsString()
  @IsOptional()
  introStartTime?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  questionTime?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  outcomeEndTime?: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  outcome?: boolean;

  @ApiProperty({ type: [AnswerDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers?: AnswerDto[];

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  answerTimeout?: number;
}
