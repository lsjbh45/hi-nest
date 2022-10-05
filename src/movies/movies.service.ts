import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>,
  ) {}

  async getAll(): Promise<Movie[]> {
    return this.moviesRepository.find();
  }

  async getOne(id: number): Promise<Movie> {
    const movie = await this.moviesRepository.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
    return movie;
  }

  async count(): Promise<number> {
    return await this.moviesRepository.count({});
  }

  async deleteOne(id: number) {
    await this.getOne(id);
    this.moviesRepository.delete({ id });
  }

  async create(movieData: CreateMovieDto) {
    const { title, year } = movieData;
    return this.moviesRepository
      .create({ id: (await this.count()) + 1, title, year })
      .save();
  }

  async update(id: number, updateData: UpdateMovieDto) {
    const { title, year } = updateData;
    const movie = await this.getOne(id);
    this.moviesRepository.save({ id, ...movie, title, year });
  }
}
