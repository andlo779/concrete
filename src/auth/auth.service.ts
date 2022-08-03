import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/model/user.model';
import { ConfigService } from '@nestjs/config';
import { AuthSessionService } from './authSession/auth-session.service';
import { AuthSteps } from './dto/next-step.response';
import { TotpService } from './totp/totp.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  logger = new Logger(AuthService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
    private readonly authSessionService: AuthSessionService,
    private readonly totpService: TotpService,
    private readonly tokenService: TokenService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    try {
      const user = await this.userService.findWithUsername(username);
      if (user && (await bcrypt.compare(password, user.password))) {
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
  ): Promise<User> {
    const session = await this.authSessionService.getBySessionId(sessionId);
    if (!session) {
      throw new ForbiddenException('Auth session not valid');
    }
    const user = await this.userService.findWithId(session.userId);
    if (this.totpService.validateToken(token, user.twoFactorAuthSecret)) {
      return user;
    }
    return null;
  }

  async handleTokenRequest(
    user: User,
  ): Promise<
    | { nextStep: AuthSteps; sessionId: string }
    | { accessToken: string; refreshToken: string }
  > {
    if (user.isTwoFactorAuthEnabled()) {
      const sessionId = await this.authSessionService.createAuthSession(
        user.userId,
      );

      return { nextStep: AuthSteps.TOTP, sessionId: sessionId };
    } else {
      return {
        accessToken: this.tokenService.generateAuthToken(user),
        refreshToken: await this.tokenService.generateRefreshToken(user.userId),
      };
    }
  }

  async handle2faTokenRequest(
    user: User,
    sessionId: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
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
      accessToken: this.tokenService.generateAuthToken(user),
      refreshToken: await this.tokenService.generateRefreshToken(user.userId),
    };
  }

  async handleRefreshTokenRequest(
    userId: string,
    refreshTokenId: string,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    let newRefreshToken;
    let user;
    try {
      newRefreshToken =
        await this.tokenService.generateNewRefreshTokenIfOldExists(
          refreshTokenId,
          userId,
        );
      user = await this.userService.findWithId(userId);
    } catch (e) {
      throw new ForbiddenException('RefreshToken could not be validated');
    }
    if (!user) {
      throw new ForbiddenException('RefreshToken could not be validated');
    }
    return {
      accessToken: this.tokenService.generateAuthToken(user),
      refreshToken: newRefreshToken,
    };
  }
}
