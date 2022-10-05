import { Resolver } from '@nestjs/graphql';
import { MoviesService } from './movies.service';

@Resolver()
export class MoviesResolver {
  constructor(private readonly moviesService: MoviesService) {}
}
