import { RefreshToken } from './refresh.token';
import { Document } from 'mongodb';

export class RefreshTokenMapper {
  static documentToModel(doc: Document): RefreshToken {
    const refreshToken = new RefreshToken();
    refreshToken.id = doc.id;
    refreshToken.userId = doc.userId;
    refreshToken.token = doc.token;
    return refreshToken;
  }
}
