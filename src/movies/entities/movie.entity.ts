import { BaseEntity, Column, Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { Genre } from './genre.entity';

@Entity()
export class Movie extends BaseEntity {
  @PrimaryColumn()
  id: number;
  @Column({ length: 30 })
  title: string;
  @Column()
  year: number;
  @OneToMany(() => Genre, (genre) => genre.movie, {
    cascade: true,
  })
  genres: Genre[];
}
