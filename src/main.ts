import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_PORT } from './constants';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('NestApplication');

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get<number>(APP_PORT, 3000);

  const config = swaggerConfig();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  try {
    await app.listen(port, '0.0.0.0');
    logger.log(`Nest application is listening on ${await app.getUrl()}`);
  } catch (e) {
    logger.error(e);
  }
}
bootstrap();

function swaggerConfig() {
  return new DocumentBuilder()
    .setTitle('Concrete')
    .setDescription(
      "API description. Most end-points are authenticated and can't be tested without valid token.",
    )
    .setVersion('1.0')
    .setContact(
      'Andreas Lord',
      'https://github.com/andlo779/concrete',
      'andlo779@gmail.com',
    )
    .addBasicAuth()
    .addBearerAuth()
    .addTag('auth')
    .addTag('users')
    .addTag(
      'healthcheck',
      'Utility end-points to determine status of the application.',
    )
    .build();
}
