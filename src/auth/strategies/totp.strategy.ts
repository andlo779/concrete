import { PassportStrategy } from '@nestjs/passport';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Strategy } from 'passport-custom';
import { Request } from 'express';
import { AuthService } from '../service/auth.service';
import { isUUID } from 'class-validator';
import { User } from '../model/request-with-user.model';

@Injectable()
export class TotpStrategy extends PassportStrategy(Strategy, 'totp') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(req: Request): Promise<User> {
    const totpToken = TotpStrategy.decodeAndValidateAuthHeader(
      req.headers['authorization'],
    );

    const sessionId = TotpStrategy.getAndValidateSessionIdFromUrlPath(req.url);

    try {
      return await this.authService.validateTwoFactorAuthentication(
        totpToken,
        sessionId,
      );
    } catch (e) {
      if (e instanceof ForbiddenException) {
        throw new UnauthorizedException();
      }
      throw e;
    }
  }

  static decodeAndValidateAuthHeader(authHeader: string): string {
    const badRequestErrorMessage = 'Authentication header not processable';
    if (!authHeader) {
      throw new BadRequestException(badRequestErrorMessage);
    }
    const split = authHeader.split(' ');
    if (split.length != 2) {
      throw new BadRequestException(badRequestErrorMessage);
    }
    if (split[0] !== 'Bearer') {
      throw new BadRequestException(badRequestErrorMessage);
    }
    const totpToken = split[1];
    if (totpToken.length != 6) {
      throw new BadRequestException(badRequestErrorMessage);
    }
    return totpToken.toString();
  }

  static getAndValidateSessionIdFromUrlPath(path: string): string {
    const internalServerErrorMessage =
      'Totp authentication strategy can only be used on end-points with authSession/:sessionId in path';
    if (!path) {
      console.log('A');
      throw new InternalServerErrorException(internalServerErrorMessage);
    }
    const split = path.split('/');
    console.log(path);
    const authSessionIndex = split.findIndex(
      (element) => element === 'auth-session',
    );
    if (authSessionIndex < 0) {
      console.log('B');

      throw new InternalServerErrorException(internalServerErrorMessage);
    }
    const sessionId = split[authSessionIndex + 1];
    if (!sessionId) {
      console.log('C');
      throw new InternalServerErrorException(internalServerErrorMessage);
    }
    if (!isUUID(sessionId)) {
      console.log('D');
      throw new InternalServerErrorException(internalServerErrorMessage);
    }
    return sessionId;
  }
}
