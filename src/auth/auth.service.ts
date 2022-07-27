import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/model/user.model';
import { authenticator } from 'otplib';
import { ConfigService } from '@nestjs/config';
import { AuthSessionService } from './auth-session.service';
import { AuthSteps } from './dto/next-step.response';

@Injectable()
export class AuthService {
  logger = new Logger(AuthService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly authSessionService: AuthSessionService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    try {
      const user = await this.userService.findWithUsername(username);
      if (user && (await bcrypt.compare(password, user.password))) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return user;
      }
    } catch (e) {
      if (e instanceof NotFoundException) {
        return null;
      }
      throw e;
    }
    return null;
  }

  async handleTokenRequest(
    user: User,
  ): Promise<
    { nextStep: AuthSteps; sessionId: string } | { access_token: string }
  > {
    if (user.isTwoFactorAuthEnabled()) {
      const sessionId = await this.authSessionService.createAuthSession(
        user.userId,
      );

      return { nextStep: AuthSteps['2FA'], sessionId: sessionId };
    } else {
      return {
        access_token: this.generateAuthToken(user),
      };
    }
  }

  async handle2faTokenRequest(
    user: User,
    sessionId: string,
  ): Promise<{ access_token: string }> {
    const authSession = await this.authSessionService.getByUSerId(user.userId);
    //ToDo: add validation if session is expired or not.....?
    if (!authSession || authSession.id !== sessionId) {
      throw new ForbiddenException('Auth session not valid');
    }
    return {
      access_token: this.generateAuthToken(user),
    };
  }

  private generateAuthToken(user: User): string {
    return this.jwtService.sign({
      username: user.name,
      userId: user.userId,
      email: user.email,
    });
  }
}
