import { DataSourceOptions, DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Puzzle } from './entities/puzzle/puzzle.entity';
import { Editor } from './entities/user/editor.entity';
import { User } from './entities/user/user.entity';
import { PuzzleHistory } from './entities/puzzle/puzzle-history.entity';
import { Pattern } from './entities/pattern/pattern.entity';
import { RiotAccount } from './entities/user/riot-account.entity';
import { PuzzleRecommendation } from './entities/recommendation/puzzle-recommendation';
import { GroupPuzzleRecommendation } from './entities/recommendation/group-puzzle-recommendation';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOSTNAME,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  entities: [
    Editor,
    User,
    RiotAccount,
    Pattern,
    Puzzle,
    PuzzleHistory,
    PuzzleRecommendation,
    GroupPuzzleRecommendation,
  ],
  migrations: ['src/migrations/**/*.ts'],
  subscribers: [],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
