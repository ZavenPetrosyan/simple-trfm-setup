import { ApiProperty } from '@nestjs/swagger';

export class ResponsePuzzleDto {
  @ApiProperty()
  createdDate: string;

  @ApiProperty()
  updatedDate: string;

  @ApiProperty()
  patch_version: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  rank: string;

  @ApiProperty()
  champion: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  difficulty: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  video_full_version: string;

  @ApiProperty()
  video_compiled_version: string;

  @ApiProperty()
  state: string;

  @ApiProperty({ type: [String] })
  patterns: string[];

  @ApiProperty()
  initialJson: any;

  @ApiProperty()
  puzzleJson: any;

  @ApiProperty()
  previewImage: string;
}

export interface PaginationMeta {
  /**
   * the amount of items on this specific page
   */
  itemCount: number;
  /**
   * the total amount of items
   */
  totalItems?: number;
  /**
   * the amount of items that were requested per page
   */
  itemsPerPage: number;
  /**
   * afterCursor value for the next page
   */
  afterCursor?: string;
}
export interface PaginationResponse<Type> {
  items: Type[];
  meta: PaginationMeta;
}

export type TResponsePuzzleDtoWithoutJson = Omit<
  ResponsePuzzleDto,
  'initialJson' | 'puzzleJson' | 'video_full_version' | 'video_compiled_version'
>;

export class ResponsePuzzleWithMetadataDto
  implements PaginationResponse<TResponsePuzzleDtoWithoutJson> {
  @ApiProperty({ type: [ResponsePuzzleDto] })
  items: TResponsePuzzleDtoWithoutJson[];
  @ApiProperty()
  meta: PaginationMeta;
}
