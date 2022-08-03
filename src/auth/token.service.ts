import { Injectable, NotFoundException } from '@nestjs/common';
import { RefreshTokensRepository } from './refreshTokens.repository';
import { ConfigService } from '@nestjs/config';
import {
  AUTH_JWT_AUTH_EXP_TIME,
  AUTH_JWT_AUTH_SECRET_KEY,
  AUTH_JWT_REFRESH_EXP_TIME,
  AUTH_JWT_REFRESH_SECRET_KEY,
} from '../constants';
import { randomUUID } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/model/user.model';
import { RefreshToken } from './model/refresh.token';

@Injectable()
export class TokenService {
  constructor(
    private readonly refreshTokensRepository: RefreshTokensRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async generateNewRefreshTokenIfOldExists(
    tokenId: string,
    userId: string,
  ): Promise<string> {
    const oldToken = await this.refreshTokensRepository.findOneById(tokenId);
    if (!oldToken) {
      console.log('shit');
      throw new NotFoundException(
        'No RefreshToken with requested id could be found.',
      );
    }
    await this.refreshTokensRepository.remove(tokenId);
    const newToken = await this.addNewRefreshToken(userId);
    return newToken.token;
  }

  async addNewRefreshToken(userId: string): Promise<RefreshToken> {
    const refreshToken = new RefreshToken();
    refreshToken.id = randomUUID();
    refreshToken.token = this.createRefreshToken(userId, refreshToken.id);
    refreshToken.userId = userId;

    return await this.refreshTokensRepository.insert(refreshToken);
  }

  generateAuthToken(user: User): string {
    const expireIn = this.configService.get<string>(
      AUTH_JWT_AUTH_EXP_TIME,
      '1m',
    );
    const secret = this.configService.get<string>(AUTH_JWT_AUTH_SECRET_KEY);

    return this.jwtService.sign(
      {
        preferred_username: user.name,
        sub: user.userId,
        email: user.email,
      },
      {
        expiresIn: expireIn,
        issuer: 'concrete',
        jwtid: randomUUID(),
        secret: secret,
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

    return this.jwtService.sign(
      { sub: userId },
      {
        expiresIn: expireIn,
        issuer: 'concrete',
        jwtid: tokenId,
        secret: secret,
      },
    );
  }
}
