import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AUTH_JWT_REFRESH_SECRET_KEY } from '../../constants';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow(AUTH_JWT_REFRESH_SECRET_KEY),
      jsonWebTokenOptions: { issuer: 'concrete' },
    });
  }

  async validate(payload: any) {
    return { user: payload.sub, tokenId: payload.jti };
  }
}
