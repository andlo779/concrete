import { AuthController } from './api/auth.controller';
import { AuthService } from './service/auth.service';
import { BasicStrategy } from './guards/strategies/basic.strategy';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './guards/strategies/jwt.strategy';
import { Module } from '@nestjs/common';
import { MongoModule } from '../mongo-client/mongo-module';
import { PassportModule } from '@nestjs/passport';
import { TotpStrategy } from './guards/strategies/totp.strategy';
import { UsersModule } from '../users/users.module';
import { JwtRefreshStrategy } from './guards/strategies/jwt-refresh.strategy';
import { TokenService } from './service/token.service';
import { TotpService } from '../users/service/totp.service';
import { AuthSessionService } from './service/auth-session.service';
import { AuthSessionRepository } from './model/auth-session/auth-session.repository';
import { RefreshTokenRepository } from './model/refresh-token/refresh-token.repository';

@Module({
  imports: [ConfigModule, MongoModule, PassportModule, UsersModule],
  providers: [
    AuthService,
    AuthSessionService,
    AuthSessionRepository,
    BasicStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
    RefreshTokenRepository,
    TokenService,
    TotpStrategy,
    TotpService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
