import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthSessionModule } from './authSession/auth-session.module';
import { BasicStrategy } from './strategies/basic.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Module } from '@nestjs/common';
import { MongoModule } from '../mongo-client/mongo-module';
import { PassportModule } from '@nestjs/passport';
import { TotpStrategy } from './strategies/totp.strategy';
import { UsersModule } from '../users/users.module';
import { TotpModule } from './totp/totp.module';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { RefreshTokensRepository } from './refreshTokens.repository';
import { TokenService } from './token.service';

//ToDo: replace JwtService from NestJS with jwt from jsonwebtoken
const jwtFactory = {
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    // secret: configService.get(AUTH_JWT_AUTH_SECRET_KEY),
    secret: 'test',
    // signOptions: {
    //   expiresIn: configService.get(AUTH_JWT_AUTH_EXP_TIME, '1m'),
    // },
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
    TotpModule,
  ],
  providers: [
    AuthService,
    BasicStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
    RefreshTokensRepository,
    TokenService,
    TotpStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
