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


  async validate(token: string): Promise<User> {
    try {
      const userId = await this.tokenService.validateRefreshToken(token);
      return {
        userId: userId,
        tokenId: token,
      };
    } catch (_error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
