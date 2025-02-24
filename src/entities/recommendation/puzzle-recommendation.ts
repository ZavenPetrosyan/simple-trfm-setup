import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Puzzle } from '../puzzle/puzzle.entity';
import { GroupPuzzleRecommendation } from './group-puzzle-recommendation';

@Entity()
export class PuzzleRecommendation {
  @PrimaryGeneratedColumn('uuid')
  id: uuid;

  @ManyToOne(() => GroupPuzzleRecommendation, { nullable: false })
  @JoinColumn({ name: 'group_recommendation_id' })
  group_recommendation: GroupPuzzleRecommendation;

  @ManyToOne(() => Puzzle, { nullable: false })
  @JoinColumn({ name: 'puzzle_id' })
  puzzle: Puzzle;
}
