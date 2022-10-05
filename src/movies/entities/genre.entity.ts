import { Movie } from 'src/movies/entities/movie.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Genre extends BaseEntity {
  @PrimaryColumn()
  id: number;
  @Column({ length: 30 })
  text: string;
  @ManyToOne(() => Movie, (movie) => movie.genres, { onDelete: 'CASCADE' })
  @JoinColumn()
  movie: Movie;
}
