import { TValidPuzzleStates } from './puzzle.types';
import { PuzzleState } from '../entities/puzzle/puzzle.enum';
import { UserRoles } from '../entities/user/user.enum';

export const INITIAL_PUZZLE_JSON = {
  issues: [],
};

export const validPuzzleStates: TValidPuzzleStates = {
  [PuzzleState.PUBLISHED]: {
    [PuzzleState.UNPUBLISHED]: [UserRoles.SUPER_EDITOR],
    [PuzzleState.ARCHIVED]: [UserRoles.SUPER_EDITOR],
  },
  [PuzzleState.UNPUBLISHED]: {
    [PuzzleState.PUBLISHED]: [UserRoles.SUPER_EDITOR],
    [PuzzleState.ARCHIVED]: [UserRoles.SUPER_EDITOR, UserRoles.EDITOR],
  },
  [PuzzleState.ARCHIVED]: {},
  [PuzzleState.PROCESSING]: {},
};
