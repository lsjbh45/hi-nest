import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Movie } from 'src/movies/entities/movie.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Genre extends BaseEntity {
  @Field(() => Int)
  @PrimaryColumn()
  id: number;

  @Field(() => String)
  @Column({ length: 30 })
  text: string;

  @Field(() => Movie)
  @ManyToOne(() => Movie, (movie) => movie.genres, { onDelete: 'CASCADE' })
  @JoinColumn()
  movie: Movie;
}
