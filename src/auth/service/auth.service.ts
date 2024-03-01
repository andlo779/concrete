import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../../users/service/users.service';
import * as bcrypt from 'bcrypt';
import { AuthSessionService } from './auth-session.service';
import { AuthSteps } from '../api/dto/next-step.response';
import { TotpService } from '../../users/service/totp.service';
import { TokenService } from './token.service';
import { User } from '../model/request-with-user.model';

@Injectable()
export class AuthService {
  logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UsersService,
    private readonly authSessionService: AuthSessionService,
    private readonly totpService: TotpService,
    private readonly tokenService: TokenService,
  ) {}

  async validateUser(username: string, password: string): Promise<string> {
    try {
      const user = await this.userService.findWithUsername(username);
      if (user && (await bcrypt.compare(password, user.password))) {
        return user.userId;
      }
    } catch (e) {
      if (e instanceof NotFoundException) {
        return null;
      }
      throw e;
    }
  }

  async validateTwoFactorAuthentication(
    token: string,
    sessionId: string,
  ): Promise<User> {
    const session = await this.authSessionService.getBySessionId(sessionId);
    if (!session) {
      throw new ForbiddenException('Auth session not valid');
    }
    const user = await this.userService.findWithId(session.userId);
    if (this.totpService.validateToken(token, user.twoFactorAuthSecret)) {
      return { userId: user.userId };
    }
    throw new ForbiddenException('Token not valid');
  }

  async handleTokenRequest(
    userId: string,
  ): Promise<
    | { nextStep: AuthSteps; sessionId: string }
    | { accessToken: string; refreshToken: string }
  > {
    const user = await this.userService.findWithId(userId);
    if (user.isTwoFactorAuthEnabled()) {
      const sessionId = await this.authSessionService.createAuthSession(
        user.userId,
      );

      return { nextStep: AuthSteps.TOTP, sessionId: sessionId };
    } else {
      return {
        accessToken: this.tokenService.generateAuthToken({
          userId: user.userId,
          userName: user.name,
          userEmail: user.email,
        }),
        refreshToken: await this.tokenService.generateRefreshToken(user.userId),
      };
    }
  }

  async handle2faTokenRequest(
    userId: string,
    sessionId: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const authSession = await this.authSessionService.getByUSerId(userId);
    if (
      !authSession ||
      authSession.id !== sessionId ||
      !authSession.isValid()
    ) {
      throw new ForbiddenException('Auth session not valid');
    }
    const user = await this.userService.findWithId(userId);
    await this.authSessionService.deleteBySessionId(sessionId);
    return {
      accessToken: this.tokenService.generateAuthToken({
        userId: user.userId,
        userName: user.name,
        userEmail: user.email,
      }),
      refreshToken: await this.tokenService.generateRefreshToken(user.userId),
    };
  }

  async handleRefreshTokenRequest(
    userId: string,
    refreshToken: string,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    let newRefreshToken;
    try {
      newRefreshToken =
        await this.tokenService.generateNewRefreshTokenIfOldExists(
          refreshToken,
          userId,
        );
    } catch (e) {
      this.logger.error(e);
      throw new ForbiddenException('RefreshToken could not be validated');
    }
    const user = await this.userService.findWithId(userId);

    if (!user) {
      throw new ForbiddenException('RefreshToken could not be validated');
    }
    return {
      accessToken: this.tokenService.generateAuthToken({
        userId: user.userId,
        userName: user.name,
        userEmail: user.email,
      }),
      refreshToken: newRefreshToken,
    };
  }
}
