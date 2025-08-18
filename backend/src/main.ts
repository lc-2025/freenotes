import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { APP } from './utilities/constants';
import { ValidationPipe } from '@nestjs/common';

/**
 * @description Server
 * @author Luca Cattide
 * @date 17/08/2025
 */
async function bootstrap() {
  // Create Express server and expose its API
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // Getting app configuration via service
  const configService = app.get(ConfigService);

  // Global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      // Security
      disableErrorMessages: process.env.NODE_ENV === 'production',
      // Validate expected data only
      whitelist: true,
    }),
  );

  await app.listen(configService.get(APP.PORT)!);
}

bootstrap();
