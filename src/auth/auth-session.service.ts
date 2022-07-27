import { Injectable } from '@nestjs/common';
import { AuthSessionRepository } from './auth-session.repository';
import { AuthSession } from './model/auth-session.model';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthSessionService {
  constructor(private readonly authSessionRepository: AuthSessionRepository) {}

  async createAuthSession(userId: string): Promise<string> {
    const oldSession = await this.authSessionRepository.findByUserId(userId);
    if (oldSession) {
      await this.authSessionRepository.remove(oldSession.id);
    }
    const session = new AuthSession();
    session.id = randomUUID();
    session.userId = userId;
    session.createdAt = new Date();

    const result = await this.authSessionRepository.insert(session);
    return result.id;
  }

  async getByUSerId(userId: string): Promise<AuthSession> {
    return await this.authSessionRepository.findByUserId(userId);
  }
}
