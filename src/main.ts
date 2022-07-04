import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_PORT } from './constants';

async function bootstrap() {
  const logger = new Logger('NestApplication');

  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get<number>(APP_PORT, 3000);
  try {
    await app.listen(port, '0.0.0.0');
    logger.log(`Nest application is listening on ${await app.getUrl()}`);
  } catch (e) {
    logger.error(e);
  }
}
bootstrap();
