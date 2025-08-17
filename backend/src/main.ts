import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { APP } from './utilities/constants';

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

  await app.listen(configService.get(APP.PORT)!);
}

bootstrap();
