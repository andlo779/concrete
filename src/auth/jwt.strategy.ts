import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AUTH_JWT_SECRET_KEY } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(AUTH_JWT_SECRET_KEY),
    });
  }

  async validate(payload: any) {
    //ToDo: How does this work again? No real validation hapening + does this expand the request with the userId and username?
    return { userId: payload.userId, username: payload.username };
  }
}
