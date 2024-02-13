import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_PORT, APP_VERSION } from './constants';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

async function bootstrap(): Promise<void> {
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
    logger.log(`NestJs application is listening on ${await app.getUrl()}`);
  } catch (error) {
    logger.error(error);
  }
}
bootstrap();

function swaggerConfig(): Omit<OpenAPIObject, 'paths'> {
  return new DocumentBuilder()
    .setTitle('Concrete')
    .setDescription(
      "API description. Most end-points are authenticated and can't be tested without valid token.",
    )
    .setVersion(APP_VERSION)
    .setContact(
      'Concrete',
      'https://github.com/andlo779/concrete',
      'andlo779@gmail.com',
    )
    .addBasicAuth()
    .addBearerAuth()
    .addTag('Auth')
    .addTag('Users')
    .addTag(
      'Health check',
      'Utility end-points to determine status of the application.',
    )
    .addTag('Records', 'Api to interact with record collections.')
    .build();
}
