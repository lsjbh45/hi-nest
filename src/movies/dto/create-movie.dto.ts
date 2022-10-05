import { Field, Int, InputType } from '@nestjs/graphql';
import { IsString, IsNumber, IsOptional } from 'class-validator';

@InputType()
export class CreateMovieDto {
  @Field(() => String)
  @IsString()
  readonly title: string;

  @Field(() => Int)
  @IsNumber()
  readonly year: number;

  @Field(() => [String])
  @IsOptional()
  @IsString({ each: true })
  readonly genres: string[];
}
