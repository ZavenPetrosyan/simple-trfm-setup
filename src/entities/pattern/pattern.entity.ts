import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Puzzle } from '../puzzle/puzzle.entity';

@Entity()
export class Pattern {
  @PrimaryGeneratedColumn('uuid')
  id: uuid;

  @Column({ type: 'varchar', length: 255 })
  text: string;

  @ManyToMany(() => Puzzle, (puzzle) => puzzle.patterns)
  puzzles: Puzzle[];
}
