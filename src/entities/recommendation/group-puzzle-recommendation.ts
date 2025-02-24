import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from '../user/user.entity';
import { PuzzleRecommendation } from './puzzle-recommendation';

@Entity()
export class GroupPuzzleRecommendation {
  @PrimaryGeneratedColumn('uuid')
  id: uuid;

  @Column({ type: 'timestamp' })
  date: Date;

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(
    () => PuzzleRecommendation,
    (puzzleRecommendation) => puzzleRecommendation.group_recommendation,
  )
  puzzleRecommendations: PuzzleRecommendation[];
}
