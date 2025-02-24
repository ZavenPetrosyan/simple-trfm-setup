import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Puzzle } from './puzzle.entity';
import { User } from '../user/user.entity';

@Entity()
export class PuzzleHistory {
  @PrimaryGeneratedColumn('uuid')
  id: uuid;

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Puzzle, {
    nullable: false,
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'puzzle_id' })
  puzzle: Puzzle;

  @Column({ type: 'timestamp' })
  startedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  finishedAt: Date;

  @Column({ type: 'int', nullable: true })
  failed_answers: number;
}
