import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import * as dotenv from 'dotenv';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';
import { validate } from './util/env.validation';
import { AppLoggerMiddleware } from './middleware/logger.middleware';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev',
      validate,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      synchronize: process.env.NODE_ENV !== 'prod',
      namingStrategy: new SnakeNamingStrategy(),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: `${process.cwd()}/src/schema.gql`,
    }),
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    if (process.env.NODE_ENV !== 'prod') {
      consumer.apply(AppLoggerMiddleware).forRoutes('*');
    }
  }
}
