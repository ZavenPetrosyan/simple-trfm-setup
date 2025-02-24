import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { RiotAccount } from './riot-account.entity';
import { GroupPuzzleRecommendation } from '../recommendation/group-puzzle-recommendation';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: uuid;

  @OneToMany(() => RiotAccount, (riotAccount) => riotAccount.user, {
    cascade: true,
  })
  riotAccounts: RiotAccount[];

  @OneToMany(
    () => GroupPuzzleRecommendation,
    (recommendation) => recommendation.user,
    { cascade: true },
  )
  recommendations: GroupPuzzleRecommendation[];
}
