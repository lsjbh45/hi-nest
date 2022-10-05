import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { Genre } from './entities/genre.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>,
    @InjectRepository(Genre)
    private readonly genresRepository: Repository<Genre>,
  ) {}

  async getAll(): Promise<Movie[]> {
    return this.moviesRepository.find({ relations: ['genres'] });
  }

  async getOne(id: number): Promise<Movie> {
    const movie = await this.moviesRepository.findOne({
      where: { id },
      relations: ['genres'],
    });
    console.log(movie);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
    return movie;
  }

  async deleteOne(id: number) {
    await this.getOne(id);
    this.moviesRepository.delete({ id });
  }

  async create(movieData: CreateMovieDto) {
    const { title, year, genres } = movieData;
    return this.moviesRepository
      .create({
        title,
        year,
        genres: genres.map((genre) => ({
          text: genre,
        })),
      })
      .save();
  }

  async update(id: number, updateData: UpdateMovieDto) {
    const { title, year, genres } = updateData;
    const movie = await this.getOne(id);

    this.moviesRepository.save({
      ...movie,
      title,
      year,
      genres: genres?.map(
        (text) => movie.genres.find((e) => e.text === text) ?? { text },
      ),
    });
  }
}
