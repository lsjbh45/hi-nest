import { Field, Int, InputType } from '@nestjs/graphql';
import { IsString, IsNumber, IsOptional } from 'class-validator';

@InputType()
export class UpdateMovieDto {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  readonly title?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  readonly year?: number;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsString({ each: true })
  readonly genres?: string[];
}
