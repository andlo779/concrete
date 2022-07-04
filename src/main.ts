import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('NestApplication');

  const app = await NestFactory.create(AppModule);

  try {
    await app.listen(3000, '0.0.0.0');
    logger.log(`Nest application is listening on  ${await app.getUrl()}`);
  } catch (e) {
    logger.error(e);
  }
}
bootstrap();
