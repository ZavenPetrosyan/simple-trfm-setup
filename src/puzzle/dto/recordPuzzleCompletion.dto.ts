import { IsInt, IsUUID } from 'class-validator';

export class RecordPuzzleCompletionDto {
  @IsUUID()
  puzzleId: string;

  @IsInt()
  failedAnswers: number;
}
