import { Puzzle } from '../entities/puzzle/puzzle.entity';
import {
  PuzzleEditorRank,
  PuzzleEditorRole,
  RiotRank,
  RiotRole,
} from '../entities/puzzle/puzzle.enum';
import {
  ResponsePuzzleDto,
  TResponsePuzzleDtoWithoutJson,
} from '../puzzle/dto/getPuzzleDto';

export function mapPuzzleEditorRoleToRiotRole(
  role: PuzzleEditorRole,
): RiotRole {
  switch (role) {
    case PuzzleEditorRole.Sup:
      return RiotRole.Support;
    case PuzzleEditorRole.Adc:
      return RiotRole.Bot;
    case PuzzleEditorRole.Mid:
      return RiotRole.Mid;
    case PuzzleEditorRole.Jngl:
      return RiotRole.Jungle;
    case PuzzleEditorRole.Top:
      return RiotRole.Top;
    default:
      return RiotRole.Support;
  }
}

export function mapRiotRoleToPuzzleEditorRole(
  role: RiotRole,
): PuzzleEditorRole {
  switch (role) {
    case RiotRole.Support:
      return PuzzleEditorRole.Sup;
    case RiotRole.Bot:
      return PuzzleEditorRole.Adc;
    case RiotRole.Mid:
      return PuzzleEditorRole.Mid;
    case RiotRole.Jungle:
      return PuzzleEditorRole.Jngl;
    case RiotRole.Top:
      return PuzzleEditorRole.Top;
    default:
      return PuzzleEditorRole.Sup;
  }
}

export function convertPuzzleToResponsePuzzleDto(
  puzzle: Puzzle,
): ResponsePuzzleDto {
  return {
    id: puzzle.id,
    name: puzzle.name,
    description: puzzle.description,
    createdDate: puzzle.createdDate ? puzzle.createdDate.toISOString() : null,
    updatedDate: puzzle.updatedDate ? puzzle.updatedDate.toISOString() : null,
    patch_version: puzzle.patch_version ?? '',
    rank: puzzle.rank ?? '',
    champion: puzzle.champion ?? '',
    role: puzzle.role ?? '',
    difficulty: puzzle.difficulty ?? '',
    author: puzzle.author?.id ?? '',
    video_full_version: puzzle.video_full_version ?? '',
    video_compiled_version: puzzle.video_compiled_version ?? '',
    state: puzzle.state ?? '',
    initialJson: puzzle.initialJson ?? null,
    puzzleJson: puzzle.puzzleJson ?? null,
    patterns: puzzle.patterns?.map((pattern) => pattern.text) ?? [],
    previewImage: puzzle.previewImage ?? '',
  };
}

export function convertPuzzleToResponsePuzzleWithoutJsonDto(
  puzzle: Puzzle,
): TResponsePuzzleDtoWithoutJson {
  return {
    id: puzzle.id,
    name: puzzle.name,
    description: puzzle.description,
    createdDate: puzzle.createdDate ? puzzle.createdDate.toISOString() : null,
    updatedDate: puzzle.updatedDate ? puzzle.updatedDate.toISOString() : null,
    patch_version: puzzle.patch_version ?? '',
    rank: puzzle.rank ?? '',
    champion: puzzle.champion ?? '',
    role: puzzle.role ?? '',
    difficulty: puzzle.difficulty ?? '',
    author: puzzle.author?.id ?? '',
    state: puzzle.state ?? '',
    patterns: puzzle.patterns?.map((pattern) => pattern.text) ?? [],
    previewImage: puzzle.previewImage ?? '',
  };
}

export function convertPuzzleEditorRankToRiotRank(
  puzzleRank: PuzzleEditorRank,
): RiotRank {
  switch (puzzleRank) {
    case PuzzleEditorRank.Iron:
      return RiotRank.Iron;
    case PuzzleEditorRank.Bronze:
      return RiotRank.Bronze;
    case PuzzleEditorRank.Silver:
      return RiotRank.Silver;
    case PuzzleEditorRank.Gold:
      return RiotRank.Gold;
    case PuzzleEditorRank.Platinum:
      return RiotRank.Platinum;
    case PuzzleEditorRank.Diamond:
      return RiotRank.Diamond;
    case PuzzleEditorRank.Master:
      return RiotRank.Master;
    case PuzzleEditorRank.GrandMaster:
      return RiotRank.GrandMaster;
    case PuzzleEditorRank.Challenger:
      return RiotRank.Challenger;
    default:
      return RiotRank.UNRANKED;
  }
}

export function convertRiotRankToPuzzleEditorRank(
  riotRank: RiotRank,
): PuzzleEditorRank {
  switch (riotRank) {
    case RiotRank.Iron:
      return PuzzleEditorRank.Iron;
    case RiotRank.Bronze:
      return PuzzleEditorRank.Bronze;
    case RiotRank.Silver:
      return PuzzleEditorRank.Silver;
    case RiotRank.Gold:
      return PuzzleEditorRank.Gold;
    case RiotRank.Platinum:
      return PuzzleEditorRank.Platinum;
    case RiotRank.Diamond:
      return PuzzleEditorRank.Diamond;
    case RiotRank.Master:
      return PuzzleEditorRank.Master;
    case RiotRank.GrandMaster:
      return PuzzleEditorRank.GrandMaster;
    case RiotRank.Challenger:
      return PuzzleEditorRank.Challenger;
    default:
      return PuzzleEditorRank.UNRANKED;
  }
}
