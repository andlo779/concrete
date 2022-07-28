import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AUTH_JWT_EXP_TIME, AUTH_JWT_SECRET_KEY } from '../constants';
import { JwtStrategy } from './jwt.strategy';
import { BasicStrategy } from './basic.strategy';
import { MongoModule } from '../mongo-client/mongo-module';
import { AuthSessionRepository } from './auth-session.repository';
import { AuthSessionService } from './auth-session.service';
import { TotpService } from './totp.service';

const jwtFactory = {
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get(AUTH_JWT_SECRET_KEY),
    signOptions: {
      expiresIn: configService.get(AUTH_JWT_EXP_TIME, '1m'),
    },
  }),
};

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    PassportModule,
    MongoModule,
    JwtModule.registerAsync(jwtFactory),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    BasicStrategy,
    AuthSessionService,
    AuthSessionRepository,
    TotpService,
  ],
  controllers: [AuthController],
  exports: [TotpService],
})
export class AuthModule {}