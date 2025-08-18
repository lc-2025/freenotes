import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { APP } from './utilities/constants';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';

/**
 * @description Server
 * @author Luca Cattide
 * @date 17/08/2025
 */
async function bootstrap() {
  const env = process.env.NODE_ENV;
  // Create Express server and expose its API
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new ConsoleLogger({
      json: true,
      logLevels:
        env === 'production'
          ? ['error', 'warn', 'fatal']
          : ['debug', 'error', 'fatal', 'log', 'verbose', 'warn'],
      prefix: 'FreeNotes',
      showHidden: env === 'development',
      sorted: true,
      timestamp: env === 'development',
    }),
  });
  // Getting app configuration via service
  const configService = app.get(ConfigService);

  // Global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      // Security
      disableErrorMessages: env === 'production',
      // Validate expected data only
      whitelist: true,
    }),
  );

  await app.listen(configService.get(APP.PORT)!);
}

bootstrap();
