import { AuthSession } from './auth-session.model';

export class AuthSessionMapper {
  static documentToModel(doc: any): AuthSession {
    const authSession = new AuthSession();
    authSession.id = doc.id;
    authSession.userId = doc.userId;
    authSession.createdAt = doc.createdAt;
    authSession.ttl = doc.ttl;
    return authSession;
  }
}
