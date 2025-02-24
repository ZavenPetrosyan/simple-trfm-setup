import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import {
  Champion,
  Difficulty,
  PuzzleEditorRole,
  PuzzleState,
  PuzzleEditorRank,
} from './puzzle.enum';
import { Editor } from '../user/editor.entity';
import { Pattern } from '../pattern/pattern.entity';
import { PuzzleRecommendation } from '../recommendation/puzzle-recommendation';

@Entity()
export class Puzzle {
  @PrimaryGeneratedColumn('uuid')
  id: uuid;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedDate: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdDate: Date;

  @Column({
    type: 'enum',
    enum: PuzzleEditorRank,
  })
  rank: PuzzleEditorRank;

  @Column({
    type: 'enum',
    enum: PuzzleEditorRole,
  })
  role: PuzzleEditorRole;

  @Column({
    type: 'enum',
    enum: Champion,
  })
  champion: Champion;

  @Column({
    type: 'enum',
    enum: Difficulty,
  })
  difficulty: Difficulty;

  @Column({ type: 'varchar', length: 255, nullable: true })
  video_full_version: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  video_compiled_version: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  previewImage: string;

  @ManyToOne(() => Editor, (user) => user.puzzles)
  @JoinTable()
  author: Editor;

  @Column({ type: 'jsonb', nullable: true })
  puzzleJson: any;

  @Column({ type: 'jsonb', nullable: true })
  initialJson: any;

  @Column({ type: 'varchar', length: 255, nullable: true })
  patch_version: string;

  @Column({
    type: 'enum',
    enum: PuzzleState,
  })
  state: PuzzleState;

  @ManyToMany(() => Pattern, { nullable: true, cascade: true })
  @JoinTable({
    name: 'puzzles_to_patterns',
    joinColumn: {
      name: 'puzzle_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'pattern_id',
      referencedColumnName: 'id',
    },
  })
  patterns: Pattern[];

  @OneToMany(
    () => PuzzleRecommendation,
    (recommendation) => recommendation.id,
    { cascade: true },
  )
  recommendations: PuzzleRecommendation[];

  constructor(
    id?: string,
    name?: string,
    description?: string,
    rank?: PuzzleEditorRank,
    role?: PuzzleEditorRole,
    champion?: Champion,
    difficulty?: Difficulty,
    video_full_version?: string,
    video_compiled_version?: string,
    patch_version?: string,
    state?: PuzzleState,
    puzzleJson?: any,
    initialJson?: any,
    previewImage?: string,
  );
  constructor(
    id: string,
    name: string,
    description: string,
    rank: PuzzleEditorRank,
    role: PuzzleEditorRole,
    champion: Champion,
    difficulty: Difficulty,
    video_full_version: string,
    video_compiled_version: string,
    patch_version: string,
    state: PuzzleState,
    puzzleJson: any,
    initialJson: any,
    previewImage: string,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.rank = rank;
    this.role = role;
    this.champion = champion;
    this.difficulty = difficulty;
    this.video_full_version = video_full_version;
    this.video_compiled_version = video_compiled_version;
    this.patch_version = patch_version;
    this.state = state;
    this.puzzleJson = puzzleJson;
    this.initialJson = initialJson;
    this.previewImage = previewImage;
  }
}
