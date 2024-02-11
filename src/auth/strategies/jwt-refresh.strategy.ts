import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AUTH_JWT_REFRESH_SECRET_KEY } from '../../constants';
import { User } from '../model/request-with-user.model';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(AUTH_JWT_REFRESH_SECRET_KEY),
      jsonWebTokenOptions: { issuer: 'concrete' },
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    return {
      userId: payload.sub,
      tokenId: payload.jti,
    };
  }
}
