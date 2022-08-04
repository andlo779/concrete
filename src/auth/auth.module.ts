import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthSessionModule } from './authSession/auth-session.module';
import { BasicStrategy } from './strategies/basic.strategy';
import { ConfigModule } from '@nestjs/config';
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

@Module({
  imports: [
    AuthSessionModule,
    ConfigModule,
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
