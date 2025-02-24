import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { UserRoles } from './user.enum';
import { Puzzle } from '../puzzle/puzzle.entity';

@Entity()
export class Editor {
  @PrimaryGeneratedColumn('uuid')
  id: uuid;

  @Column({ type: 'varchar', length: 255, nullable: true, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  temporaryPassword: string;

  @Column({
    type: 'enum',
    enum: UserRoles,
    nullable: true,
  })
  role: UserRoles;

  @OneToMany(() => Puzzle, (puzzle) => puzzle.author, { cascade: true })
  puzzles: Puzzle[];
}
