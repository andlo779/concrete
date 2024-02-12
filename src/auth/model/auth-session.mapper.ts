import { AuthSession } from './auth-session.model';

export class AuthSessionMapper {
  static documentToModel(doc: any): AuthSession {
    return new AuthSession(doc.userId, doc.ttl, doc.id, doc.createdAt);
  }
}
