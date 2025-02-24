import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PuzzleService } from './puzzle.service';
import { PuzzleController } from './puzzle.controller';
import { Puzzle } from '../entities/puzzle/puzzle.entity';
import { Editor } from '../entities/user/editor.entity';
import { Pattern } from '../entities/pattern/pattern.entity';
import { PuzzleHistory } from '../entities/puzzle/puzzle-history.entity';
import { RiotAccount } from '../entities/user/riot-account.entity';
import { PuzzleRecommendation } from '../entities/recommendation/puzzle-recommendation';
import { GroupPuzzleRecommendation } from '../entities/recommendation/group-puzzle-recommendation';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Puzzle,
      Editor,
      Pattern,
      PuzzleHistory,
      PuzzleRecommendation,
      GroupPuzzleRecommendation,
      RiotAccount,
    ]),
  ],
  providers: [PuzzleService],
  controllers: [PuzzleController],
})
export class PuzzleModule {}
