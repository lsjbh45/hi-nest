import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Movie extends BaseEntity {
  @PrimaryColumn()
  id: number;
  @Column({ length: 30 })
  title: string;
  @Column()
  year: number;
  // genres: string[];
}
