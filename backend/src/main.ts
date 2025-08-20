import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { APP, ENVIRONMENTS } from './utilities/constants';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';

/**
 * @description Server
 * @author Luca Cattide
 * @date 17/08/2025
 * TODO: See https://docs.nestjs.com/recipes/terminus
 */
async function bootstrap() {
  const { DESCRIPTION, ENDPOINT, NAME, PORT, VERSION } = APP;
  const env = process.env.NODE_ENV;
  const isDevelopment = env === ENVIRONMENTS[0];
  const isProduction = env === ENVIRONMENTS[1];
  // Create Express server and expose its API
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new ConsoleLogger({
      json: true,
      logLevels: isProduction
        ? ['error', 'warn', 'fatal']
        : ['debug', 'error', 'fatal', 'log', 'verbose', 'warn'],
      prefix: NAME,
      showHidden: isDevelopment,
      sorted: true,
      timestamp: true,
    }),
    snapshot: isDevelopment,
  });
  // Getting app configuration via service
  const configService = app.get(ConfigService);

  // Global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      // Security
      disableErrorMessages: isProduction,
      // Validate expected data only
      whitelist: true,
    }),
  );
  // CORS
  app.enableCors();

  // OpenAPI
  const swagger = new DocumentBuilder()
    .setTitle(NAME)
    .setDescription(DESCRIPTION)
    .setVersion(VERSION)
    .addTag(NAME)
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, swagger);

  SwaggerModule.setup(ENDPOINT, app, documentFactory, {
    jsonDocumentUrl: `${ENDPOINT}/json`,
  });

  await app.listen(configService.get(PORT)!);
}

bootstrap();
