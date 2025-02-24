import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from './ormconfig';
import { PuzzleModule } from './puzzle/puzzle.module';

import configuration from '../src/helpers/auth.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    PuzzleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
