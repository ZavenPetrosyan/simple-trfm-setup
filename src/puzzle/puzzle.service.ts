import { ConfigService } from '@nestjs/config';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Puzzle } from '../entities/puzzle/puzzle.entity';
import { CreatePuzzleResponseDto } from './dto/puzzleDto';
import {
  Champion,
  Difficulty,
  PuzzleState,
  PuzzleEditorRank,
  PuzzleEditorRole,
} from '../entities/puzzle/puzzle.enum';
import {
  IPuzzleQueryParams,
  EPuzzleSortField,
  EPuzzleSortOrder,
} from './puzzle.types';
import { Editor } from '../entities/user/editor.entity';
import { Pattern } from '../entities/pattern/pattern.entity';
import {
  ResponsePuzzleDto,
  ResponsePuzzleWithMetadataDto,
} from './dto/getPuzzleDto';
import { PuzzleHistory } from '../entities/puzzle/puzzle-history.entity';

@Injectable()
export class PuzzleService {
  private readonly dailyPuzzleLimit: number;
  private readonly logger = new Logger(PuzzleService.name);

  constructor(
    @InjectRepository(Puzzle)
    private readonly puzzleRepository: Repository<Puzzle>,

    @InjectRepository(Pattern)
    private readonly patternRepository: Repository<Pattern>,

    @InjectRepository(Editor)
    private readonly userRepository: Repository<Editor>,

    @InjectRepository(PuzzleHistory)
    private puzzleHistoryRepository: Repository<PuzzleHistory>,

    private readonly configService: ConfigService,
  ) {
    this.dailyPuzzleLimit =
      +this.configService.get<number>('DAILY_PUZZLE_LIMIT') || 7;
  }

  public async createPuzzle(
    authorId: string,
  ): Promise<CreatePuzzleResponseDto> {
    const author = await this.userRepository.findOne({
      where: { id: authorId },
    });

    // Create the puzzle and assign the author
    const puzzle = this.puzzleRepository.create({
      author,
      rank: PuzzleEditorRank.Iron,
      role: PuzzleEditorRole.Top,
      champion: Champion.ASHE,
      difficulty: Difficulty.Easy,
      state: PuzzleState.UNPUBLISHED,
    });

    try {
      const puzzleSaved = await this.puzzleRepository.save(puzzle);
      // const { uploadUrl } = await this.generateUploadUrl(puzzleSaved.id);
      return {
        id: puzzleSaved.id,
        success: true,
        uploadUrl: 'uploadUrl',
      };
    } catch (err) {
      console.log(err);
      throw new BadRequestException();
    }
  }

  public async getPuzzles(
    params: IPuzzleQueryParams,
  ): Promise<ResponsePuzzleWithMetadataDto> {
    const sortField = params?.sortField || EPuzzleSortField.createdDate;
    const sortOrder = params?.sortOrder || EPuzzleSortOrder.DESC;
    const limit = params?.limit || 10;
    const offset = params?.offset || 0;

    const query = this.puzzleRepository
      .createQueryBuilder('puzzle')
      .leftJoinAndSelect('puzzle.patterns', 'patterns')
      .leftJoinAndSelect('puzzle.author', 'author');

    this.applyFilters(query, params);

    query
      .orderBy(`puzzle.${sortField}`, sortOrder)
      .addOrderBy('puzzle.id', sortOrder)
      .take(limit)
      .skip(offset);

    try {
      const [puzzleData, totalItems] = await query.getManyAndCount();

      const responsePuzzles = puzzleData.map((puzzle) => ({
        id: puzzle.id,
        name: puzzle.name || '',
        description: puzzle.description || '',
        createdDate: puzzle.createdDate
          ? puzzle.createdDate.toISOString()
          : null,
        updatedDate: puzzle.updatedDate
          ? puzzle.updatedDate.toISOString()
          : null,
        patch_version: puzzle.patch_version || '',
        rank: puzzle.rank || '',
        champion: puzzle.champion || '',
        role: puzzle.role || '',
        difficulty: puzzle.difficulty || '',
        author: puzzle.author?.id || '',
        state: puzzle.state || '',
        patterns: puzzle.patterns.map((pattern) => pattern.text),
        previewImage: puzzle.previewImage || '',
      }));

      return {
        items: responsePuzzles,
        meta: {
          itemCount: responsePuzzles.length,
          totalItems,
          itemsPerPage: limit,
        },
      };
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }
      throw new InternalServerErrorException('Failed to fetch puzzles');
    }
  }

  public async getPuzzleById(id: string): Promise<ResponsePuzzleDto> {
    const puzzle = await this.puzzleRepository.findOne({
      where: { id },
      relations: ['patterns', 'author'],
    });

    if (!puzzle) {
      throw new NotFoundException('Puzzle not found');
    }

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
      patterns: puzzle.patterns.map((pattern) => pattern.text),
      previewImage: puzzle.previewImage ?? '',
    };
  }

  public async deletePuzzleById(id: string): Promise<void> {
    const result = await this.puzzleRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Puzzle with ID "${id}" not found`);
    }
  }

  private applyFilters(query: any, params: IPuzzleQueryParams): void {
    const { search, rank, champion, role, difficulty, author, state } = params;

    if (search) {
      query.andWhere('puzzle.name ILIKE :search', {
        search: `%${search}%`,
      });
    }

    if (rank) {
      query.andWhere('puzzle.rank = :rank', { rank });
    }

    if (champion) {
      query.andWhere('puzzle.champion = :champion', { champion });
    }

    if (role) {
      query.andWhere('puzzle.role = :role', { role });
    }

    if (difficulty) {
      query.andWhere('puzzle.difficulty = :difficulty', { difficulty });
    }

    if (author) {
      query.andWhere('puzzle.author = :author', { author });
    }

    if (state) {
      query.andWhere('puzzle.state = :state', { state });
    }
  }

  async generateUploadUrl(puzzleId: string): Promise<{ uploadUrl: string }> {
    const apiKey = this.configService.get<string>('bunnyApiKey');
    const libraryId = this.configService.get<string>('bunnyLibraryId');
    const url = `https://video.bunnycdn.com/library/${libraryId}/videos`;

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        AccessKey: apiKey,
      },
      body: JSON.stringify({ title: `Puzzle ${puzzleId} Video` }),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (!response.ok) {
        throw new HttpException(
          `Failed to generate upload URL: ${data.message}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const videoId = data.guid;
      const uploadUrl = `https://video.bunnycdn.com/library/${libraryId}/videos/${videoId}`;
      return { uploadUrl };
    } catch (error) {
      throw new HttpException(
        `Failed to generate upload URL: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async recordPuzzleCompletion({
    userId,
    puzzleId,
    failedAnswers,
  }: {
    userId: string;
    puzzleId: string;
    failedAnswers: number;
  }): Promise<PuzzleHistory> {
    this.logger.debug(
      `Recording puzzle completion for user ${userId}, puzzle ${puzzleId}, failed answers: ${failedAnswers}`,
    );
    const puzzleHistory = this.puzzleHistoryRepository.create({
      user: { id: userId }, // assuming User entity's primary key is 'id'
      puzzle: { id: puzzleId }, // assuming Puzzle entity's primary key is 'id'
      startedAt: new Date(), // you may want to adjust this depending on your logic
      finishedAt: new Date(),
      failed_answers: failedAnswers,
    });

    return await this.puzzleHistoryRepository.save(puzzleHistory);
  }
}
