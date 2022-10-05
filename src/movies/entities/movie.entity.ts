import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { Genre } from './genre.entity';

@ObjectType()
@Entity()
export class Movie extends BaseEntity {
  @Field(() => Int)
  @PrimaryColumn()
  id: number;

  @Field(() => String)
  @Column({ length: 30 })
  title: string;

  @Field(() => Int)
  @Column()
  year: number;

  @Field(() => [Genre])
  @OneToMany(() => Genre, (genre) => genre.movie, {
    cascade: true,
  })
  genres: Genre[];
}
