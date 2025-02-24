import { Puzzle } from '../entities/puzzle/puzzle.entity';
import {
  Difficulty,
  PuzzleState,
  PuzzleEditorRank,
  PuzzleEditorRole,
} from '../entities/puzzle/puzzle.enum';
import { UserRoles } from '../entities/user/user.enum';

export enum EPuzzleSortField {
  createdDate = 'createdDate',
  updatedDate = 'updatedDate',
  name = 'name',
}

export enum EPuzzleSortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface IPuzzleQueryParams {
  search?: string;
  rank?: PuzzleEditorRank;
  champion?: string;
  role?: PuzzleEditorRole;
  difficulty?: Difficulty;
  author?: string;
  state?: PuzzleState;
  limit?: number;
  offset?: number;
  sortField?: EPuzzleSortField;
  sortOrder?: EPuzzleSortOrder;
}

export type TValidPuzzleStates = Record<
  PuzzleState,
  Partial<Record<PuzzleState, UserRoles[]>>
>;

export type TPuzzleRecommendationScore = {
  puzzle: Puzzle;
  score: number;
};
