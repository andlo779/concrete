import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-http-bearer';
import { User } from '../../model/request-with-user.model';
import { TokenService } from '../../service/token.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private readonly tokenService: TokenService) {
    super();
  }

  // ToDo:
  // 1. Need to delete old refresh tokens before storing a new one
  // 2. Documents in db take the private property names, so they all start with "_"
  // 3. Objects returned from DB are not of the correct type, they have the signature of the class, but not the methods

  // Also should update the totp strategy to use bearer-http-strategy so we don't need to pars the auth header.....
  async validate(token: string): Promise<User> {
    try {
      const userId = await this.tokenService.validateRefreshToken(token);
      return {
        userId: userId,
        tokenId: token,
      };
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
