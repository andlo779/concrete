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
import { ConfigService } from '@nestjs/config';
import { AuthSessionService } from './auth-session.service';
import { AuthSteps } from './dto/next-step.response';
import { TotpService } from './totp.service';

@Injectable()
export class AuthService {
  logger = new Logger(AuthService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly authSessionService: AuthSessionService,
    private readonly totpService: TotpService,
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

  async validateTwoFactorAuthentication(
    token: string,
    sessionId: string,
  ): Promise<boolean> {
    const session = await this.authSessionService.getBySessionId(sessionId);
    if (!session) {
      throw new ForbiddenException('Auth session not valid');
    }
    const user = await this.userService.findWithId(session.userId);
    return this.totpService.validateToken(token, user.twoFactorAuthSecret);
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

      return { nextStep: AuthSteps.TOTP, sessionId: sessionId };
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
    if (
      !authSession ||
      authSession.id !== sessionId ||
      !authSession.isValid()
    ) {
      throw new ForbiddenException('Auth session not valid');
    }
    await this.authSessionService.deleteBySessionId(sessionId);
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
