import { AUTH_JWT_EXP_TIME, AUTH_JWT_SECRET_KEY } from '../constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthSessionModule } from '../authSession/auth-session.module';
import { AuthSessionRepository } from '../authSession/auth-session.repository';
import { AuthSessionService } from '../authSession/auth-session.service';
import { BasicStrategy } from './basic.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { Module } from '@nestjs/common';
import { MongoModule } from '../mongo-client/mongo-module';
import { PassportModule } from '@nestjs/passport';
import { TotpService } from './totp.service';
import { TotpStrategy } from './totp.strategy';
import { UsersModule } from '../users/users.module';

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
    AuthSessionModule,
    ConfigModule,
    JwtModule.registerAsync(jwtFactory),
    MongoModule,
    PassportModule,
    UsersModule,
  ],
  providers: [
    AuthService,
    AuthSessionRepository,
    AuthSessionService,
    BasicStrategy,
    JwtStrategy,
    TotpService,
    TotpStrategy,
  ],
  controllers: [AuthController],
  exports: [TotpService],
})
export class AuthModule {}
