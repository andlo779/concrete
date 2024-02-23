import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  AUTH_JWT_AUTH_EXP_TIME,
  AUTH_JWT_AUTH_SECRET_KEY,
  AUTH_JWT_REFRESH_EXP_IN_DAYS,
} from '../../constants';
import { randomUUID } from 'crypto';
import { RefreshToken } from '../model/refresh-token/refresh-token.model';
import { sign } from 'jsonwebtoken';
import { RefreshTokenRepository } from '../model/refresh-token/refresh-token.repository';
import dayjs from 'dayjs';

@Injectable()
export class TokenService {
  constructor(
    private readonly refreshTokensRepository: RefreshTokenRepository,
    private readonly configService: ConfigService,
  ) {}

  async generateNewRefreshTokenIfOldExists(
    tokenId: string,
    userId: string,
  ): Promise<string> {
    const oldToken = await this.refreshTokensRepository.findOneByToken(tokenId);
    if (!oldToken) {
      throw new NotFoundException(
        `No RefreshToken for userId: ${userId} could be found.`,
      );
    }
    return this.generateRefreshToken(userId);
  }

  async addNewRefreshToken(userId: string): Promise<string> {
    const expireIn = this.configService.getOrThrow<number>(
      AUTH_JWT_REFRESH_EXP_IN_DAYS,
    );

    const expDate = dayjs().add(expireIn, 'day').toDate();
    const token = new RefreshToken(userId, expDate);
    await this.refreshTokensRepository.insert(token);

    return token.token;
  }

  generateAuthToken({
    userId,
    userName,
    userEmail,
  }: {
    userId: string;
    userName: string;
    userEmail: string;
  }): string {
    const expireIn = this.configService.get<string>(
      AUTH_JWT_AUTH_EXP_TIME,
      '1m',
    );
    const secret = this.configService.get<string>(AUTH_JWT_AUTH_SECRET_KEY);

    return sign(
      {
        preferred_username: userName,
        sub: userId,
        email: userEmail,
      },
      secret,
      {
        expiresIn: expireIn,
        issuer: 'concrete',
        jwtid: randomUUID(),
      },
    );
  }

  async generateRefreshToken(userId: string): Promise<string> {
    await this.refreshTokensRepository.deleteAllByUserId(userId);
    return await this.addNewRefreshToken(userId);
  }

  async validateRefreshToken(token: string): Promise<string> {
    const tokenFromDb =
      await this.refreshTokensRepository.findOneByToken(token);
    if (!tokenFromDb) {
      throw new NotFoundException('Token not found.');
    }
    if (tokenFromDb.expiresAt.getTime() <= Date.now()) {
      throw new UnauthorizedException('Token expired.');
    }
    return tokenFromDb.userId;
  }
}
