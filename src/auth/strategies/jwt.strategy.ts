import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AUTH_JWT_AUTH_SECRET_KEY } from '../../constants';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../model/request-with-user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      issuer: 'concrete',
      secretOrKey: configService.get(AUTH_JWT_AUTH_SECRET_KEY),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    return { userId: payload.sub };
  }
}
