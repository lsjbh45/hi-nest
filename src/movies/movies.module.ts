import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from './entities/genre.entity';
import { Movie } from './entities/movie.entity';
import { MoviesController } from './movies.controller';
import { MoviesResolver } from './movies.resolver';
import { MoviesService } from './movies.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Genre])],
  controllers: [MoviesController],
  providers: [MoviesResolver, MoviesService],
})
export class MoviesModule {}
