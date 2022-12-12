import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.use(cookieParser());

  let isDisableKeepAlive = false;
  app.use(function (req, res, next) {
    if (isDisableKeepAlive) {
      res.set('Connection', 'close');
    }
    next();
  });

  const configService = app.get(ConfigService);
  const port = configService.get('APP_PORT');
  app.listen(port, function () {
    process.send('ready');
  });

  process.on('SIGINT', function () {
    isDisableKeepAlive = true;
    app.close();
    process.exit(0);
  });
}
bootstrap();
