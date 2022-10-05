import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  Body,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async getAll(): Promise<Movie[]> {
    return await this.moviesService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') movieId: number): Promise<Movie> {
    return await this.moviesService.getOne(movieId);
  }

  @Post()
  async create(@Body() movieData: CreateMovieDto) {
    return await this.moviesService.create(movieData);
  }

  @Delete(':id')
  async remove(@Param('id') movieId: number) {
    return await this.moviesService.deleteOne(movieId);
  }

  @Patch(':id')
  async patch(
    @Param('id') movieId: number,
    @Body() updateData: UpdateMovieDto,
  ) {
    return await this.moviesService.update(movieId, updateData);
  }
}
