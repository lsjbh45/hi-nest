import { Field, Int, InputType } from '@nestjs/graphql';
import { IsString, IsNumber, IsOptional } from 'class-validator';

@InputType()
export class UpdateMovieDto {
  @Field(() => String)
  @IsOptional()
  @IsString()
  readonly title?: string;

  @Field(() => Int)
  @IsOptional()
  @IsNumber()
  readonly year?: number;

  @Field(() => [String])
  @IsOptional()
  @IsString({ each: true })
  readonly genres?: string[];
}
