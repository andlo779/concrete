import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AUTH_JWT_AUTH_SECRET_KEY } from '../../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(AUTH_JWT_AUTH_SECRET_KEY),
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, userName: payload.preferred_username };
  }
}
