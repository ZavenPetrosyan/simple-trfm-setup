import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './user.entity';
import { RiotRank, RiotRole } from '../puzzle/puzzle.enum';

@Entity()
export class RiotAccount {
  @PrimaryGeneratedColumn('uuid')
  id: uuid;

  @Column({ type: 'varchar', length: 5, nullable: true })
  cpid: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  riot_puuid: string;

  @ManyToOne(() => User, (user) => user.riotAccounts, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'boolean', nullable: true })
  main_account: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  summoner_name: string;

  @Column({ type: 'enum', enum: RiotRank, nullable: true })
  summoner_rank: RiotRank;

  @Column({ type: 'varchar', length: 255, nullable: true })
  last_season_rank: string;

  @Column({ type: 'enum', enum: RiotRole, nullable: true })
  summoner_main_role: RiotRole;

  @Column({ type: 'enum', enum: RiotRole, nullable: true })
  summoner_secondary_role: RiotRole;

  @Column({ type: 'enum', enum: RiotRole, nullable: true })
  summoner_tertiary_role: RiotRole;

  @Column({ type: 'varchar', length: 255, nullable: true })
  region: string;

  @Column({ type: 'int', nullable: true })
  account_level: number;

  @Column({ type: 'int', nullable: true })
  soloq_played_last_month: number;

  @Column({ type: 'int', nullable: true })
  wins_last_month: number;

  @Column({ type: 'int', nullable: true })
  losses_last_month: number;

  @Column({ type: 'json', nullable: true })
  most_played_champions: any[];

  @Column({ type: 'text', nullable: true })
  riot_account_id: string;

  @Column({ type: 'text', nullable: true })
  riot_id: string;

  @Column({ type: 'text', nullable: true })
  summoner_id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  last_login: Date;
}
