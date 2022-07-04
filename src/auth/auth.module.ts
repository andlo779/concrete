import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AUTH_JWT_EXP_TIME, AUTH_JWT_SECRET_KEY } from '../constants';
import { JwtStrategy } from './jwt.strategy';

const jwtFactory = {
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get(AUTH_JWT_SECRET_KEY),
    signOptions: {
      expiresIn: configService.get(AUTH_JWT_EXP_TIME, '1m'),
    },
  }),
  inject: [ConfigService],
};

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    PassportModule,
    JwtModule.registerAsync(jwtFactory),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
