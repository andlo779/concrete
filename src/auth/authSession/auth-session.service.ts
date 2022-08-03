import { Injectable } from '@nestjs/common';
import { AuthSessionRepository } from './auth-session.repository';
import { AuthSession } from './model/auth-session.model';
import { randomUUID } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { AUTH_SESSION_EXP_TIME } from '../../constants';

@Injectable()
export class AuthSessionService {
  constructor(
    private readonly authSessionRepository: AuthSessionRepository,
    private readonly configService: ConfigService,
  ) {}

  async createAuthSession(userId: string): Promise<string> {
    const oldSession = await this.authSessionRepository.findByUserId(userId);
    if (oldSession) {
      await this.authSessionRepository.remove(oldSession.id);
    }
    const session = new AuthSession();
    session.id = randomUUID();
    session.userId = userId;
    session.createdAt = new Date();
    session.ttl = this.getTimeToLive();

    const result = await this.authSessionRepository.insert(session);
    return result.id;
  }

  async getByUSerId(userId: string): Promise<AuthSession> {
    return await this.authSessionRepository.findByUserId(userId);
  }

  async getBySessionId(sessionId: string): Promise<AuthSession> {
    return await this.authSessionRepository.findOneById(sessionId);
  }

  async deleteBySessionId(sessionId: string) {
    await this.authSessionRepository.remove(sessionId);
  }

  private getTimeToLive(): number {
    const ttlConf = this.configService.get<string>(AUTH_SESSION_EXP_TIME, '3m');
    const splitConf = ttlConf.split('');
    return Number(splitConf[0]);
  }
}
