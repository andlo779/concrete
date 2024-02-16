import { Injectable, NotFoundException } from '@nestjs/common';
import { RefreshTokensRepository } from '../model/refreshTokens.repository';
import { ConfigService } from '@nestjs/config';
import {
  AUTH_JWT_AUTH_EXP_TIME,
  AUTH_JWT_AUTH_SECRET_KEY,
  AUTH_JWT_REFRESH_EXP_TIME,
  AUTH_JWT_REFRESH_SECRET_KEY,
} from '../../constants';
import { randomUUID } from 'crypto';
import { RefreshToken } from '../model/refresh-token.model';
import { sign } from 'jsonwebtoken';

@Injectable()
export class TokenService {
  constructor(
    private readonly refreshTokensRepository: RefreshTokensRepository,
    private readonly configService: ConfigService,
  ) {}

  async generateNewRefreshTokenIfOldExists(
    tokenId: string,
    userId: string,
  ): Promise<string> {
    const oldToken = await this.refreshTokensRepository.findOneById(userId);
    if (!oldToken) {
      throw new NotFoundException(
        `No RefreshToken for userId: ${userId} could be found.`,
      );
    }
    await this.refreshTokensRepository.remove(oldToken.xxid);
    const newToken = await this.addNewRefreshToken(userId);
    return newToken.token;
  }

  async addNewRefreshToken(userId: string): Promise<RefreshToken> {
    const tokenId = randomUUID();
    const token = this.createRefreshToken(userId, tokenId);
    const refreshToken = new RefreshToken(userId, token, 1);

    return await this.refreshTokensRepository.insert(refreshToken);
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
    await this.refreshTokensRepository.removeByUserId(userId);
    const newToken = await this.addNewRefreshToken(userId);
    return newToken.token;
  }

  private createRefreshToken(userId: string, tokenId: string): string {
    const expireIn = this.configService.get<string>(
      AUTH_JWT_REFRESH_EXP_TIME,
      '30d',
    );
    const secret = this.configService.get<string>(AUTH_JWT_REFRESH_SECRET_KEY);

    return sign({ sub: userId }, secret, {
      expiresIn: expireIn,
      issuer: 'concrete',
      jwtid: tokenId,
    });
  }
}
