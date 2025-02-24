import {
  Controller,
  Get,
  Delete,
  Param,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiTags,
  ApiQuery,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PuzzleService } from './puzzle.service';
import { CreatePuzzleResponseDto } from './dto/puzzleDto';
import {
  Difficulty,
  PuzzleState,
  PuzzleEditorRank,
  PuzzleEditorRole,
} from '../entities/puzzle/puzzle.enum';
import {
  ResponsePuzzleDto,
  ResponsePuzzleWithMetadataDto,
} from './dto/getPuzzleDto';
import { EPuzzleSortField, EPuzzleSortOrder } from './puzzle.types';

@ApiTags('Puzzle')
@Controller('puzzle')
export class PuzzleController {
  constructor(private readonly puzzleService: PuzzleService) {}

  @Post()
  @ApiBearerAuth('User-JWT')
  @ApiOperation({ summary: 'Create puzzle' })
  @ApiOkResponse({
    type: CreatePuzzleResponseDto,
    description: 'Puzzle created successfully',
    isArray: false,
  })
  async addPuzzle(
    @Request() req,
  ): Promise<{ puzzleId: string; uploadUrl: string; success: boolean }> {
    const { id: authorId } = req.user;
    const puzzle = await this.puzzleService.createPuzzle(authorId);
    return {
      puzzleId: puzzle.id,
      uploadUrl: puzzle.uploadUrl,
      success: true,
    };
  }

  @Get()
  @ApiBearerAuth('User-JWT')
  @ApiOperation({ summary: 'Search and filter puzzles' })
  @ApiQuery({ name: 'search', type: String, required: false })
  @ApiQuery({ name: 'rank', enum: PuzzleEditorRank, required: false })
  @ApiQuery({ name: 'champion', type: String, required: false })
  @ApiQuery({ name: 'role', enum: PuzzleEditorRole, required: false })
  @ApiQuery({ name: 'difficulty', enum: Difficulty, required: false })
  @ApiQuery({ name: 'author', type: String, required: false })
  @ApiQuery({ name: 'state', enum: PuzzleState, required: false })
  @ApiQuery({ name: 'take', type: Number, required: false })
  @ApiQuery({ name: 'skip', type: Number, required: false })
  @ApiOkResponse({
    description: 'A list of puzzles matching the search and filters',
    type: [ResponsePuzzleDto],
  })
  async getPuzzles(
    @Request() req,
    @Query('search') search?: string,
    @Query('rank') rank?: PuzzleEditorRank,
    @Query('champion') champion?: string,
    @Query('role') role?: PuzzleEditorRole,
    @Query('difficulty') difficulty?: Difficulty,
    @Query('author') author?: string,
    @Query('state') state?: PuzzleState,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
    @Query('sortField') sortField?: EPuzzleSortField,
    @Query('sortOrder') sortOrder?: EPuzzleSortOrder,
  ): Promise<ResponsePuzzleWithMetadataDto> {
    const { items, meta } = await this.puzzleService.getPuzzles({
      search,
      rank,
      champion,
      role,
      difficulty,
      author,
      state,
      limit,
      offset,
      sortField,
      sortOrder,
    });
    return { items, meta };
  }

  @Get(':id')
  @ApiBearerAuth('User-JWT')
  @ApiOperation({ summary: 'Get a puzzle by ID' })
  @ApiParam({ name: 'id', description: 'The UUID of the puzzle to get' })
  @ApiOkResponse({
    description: 'Successfully retrieved the puzzle',
    type: ResponsePuzzleDto,
  })
  async getPuzzleById(@Param('id') id: string): Promise<ResponsePuzzleDto> {
    return this.puzzleService.getPuzzleById(id);
  }

  @Delete(':id')
  @ApiBearerAuth('User-JWT')
  @ApiOperation({ summary: 'Delete a puzzle by ID' })
  @ApiParam({ name: 'id', description: 'The UUID of the puzzle to delete' })
  @ApiOkResponse({
    description: 'Successfully deleted the puzzle',
    schema: {
      example: { success: true },
    },
  })
  @ApiOkResponse({
    description: 'Puzzle not found',
    schema: {
      example: { success: false },
    },
  })
  async deletePuzzle(@Param('id') id: string): Promise<{ success: boolean }> {
    await this.puzzleService.deletePuzzleById(id);
    return { success: true };
  }

  @Post(':id/upload-url')
  @ApiBearerAuth('User-JWT')
  @ApiOperation({ summary: 'Generate upload URL for video' })
  @ApiParam({
    name: 'id',
    description: 'The UUID of the puzzle to upload video for',
  })
  @ApiOkResponse({
    description: 'Upload URL generated successfully',
    schema: {
      example: {
        uploadUrl:
          'https://video.bunny.net/library/your_library_id/videos/your_video_id',
      },
    },
  })
  async generateUploadUrl(
    @Param('id') id: string,
  ): Promise<{ uploadUrl: string }> {
    return this.puzzleService.generateUploadUrl(id);
  }
}
