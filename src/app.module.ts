import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { AuthSessionModule } from './authSession/auth-session.module';
import { ConfigModule } from '@nestjs/config';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { RecordsModule } from './records/records.module';
import { RequestResponseLoggerMiddleware } from './middleware/request-response-logger.middleware';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    AuthSessionModule,
    ConfigModule.forRoot({ isGlobal: true }),
    HealthcheckModule,
    RecordsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestResponseLoggerMiddleware).forRoutes('*');
  }
}
