import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { BasicStrategy as Strategy } from 'passport-http';
import { AuthService } from '../../service/auth.service';
import { User } from '../../model/request-with-user.model';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<User> {
    const userId = await this.authService.validateUser(username, password);
    if (!userId) {
      throw new UnauthorizedException();
    }
    return { userId: userId };
  }
}
