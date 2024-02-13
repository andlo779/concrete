import { AuthSession } from './auth-session.model';
import { Document } from 'mongodb';

export class AuthSessionMapper {
  static documentToModel(doc: Document): AuthSession {
    return new AuthSession(doc.userId, doc.ttl, doc.id, doc.createdAt);
  }
}
