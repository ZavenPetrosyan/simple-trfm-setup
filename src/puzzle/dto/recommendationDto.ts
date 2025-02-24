import { ApiProperty } from '@nestjs/swagger';
import {
  Difficulty,
  PuzzleEditorRank,
  RiotRole,
} from '../../entities/puzzle/puzzle.enum';

export class PuzzleRecommendationDto {
  @ApiProperty({ description: 'Unique identifier of the puzzle' })
  id: string;

  @ApiProperty({ description: 'Name of the puzzle' })
  name: string;

  @ApiProperty({ description: 'Description of the puzzle' })
  description: string;

  @ApiProperty({
    description: 'Rank associated with the puzzle',
    enum: PuzzleEditorRank,
  })
  rank: PuzzleEditorRank;

  @ApiProperty({
    description: 'Role associated with the puzzle',
    enum: RiotRole,
  })
  role: RiotRole;

  @ApiProperty({
    description: 'Difficulty level of the puzzle',
    enum: Difficulty,
  })
  difficulty: Difficulty;
}
