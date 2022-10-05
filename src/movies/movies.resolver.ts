import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Resolver()
export class MoviesResolver {
  constructor(private readonly moviesService: MoviesService) {}

  @Mutation(() => Movie)
  async createMovie(@Args('input') input: CreateMovieDto): Promise<Movie> {
    return this.moviesService.create(input);
  }

  @Mutation(() => Movie)
  async updateMovie(
    @Args('id') id: number,
    @Args('input') input: UpdateMovieDto,
  ): Promise<Movie> {
    return this.moviesService.update(id, input);
  }

  @Mutation(() => Boolean, { nullable: true })
  async deleteMovie(@Args('id') id: number): Promise<void> {
    return this.moviesService.deleteOne(id);
  }

  @Query(() => [Movie])
  async getMovies(): Promise<Movie[]> {
    return this.moviesService.getAll();
  }

  @Query(() => Movie)
  async getMovieById(@Args('id') id: number): Promise<Movie> {
    return this.moviesService.getOne(id);
  }
}
