import { RefreshToken } from './refresh.token';

export class RefreshTokenMapper {
  static documentToModel(doc: any): RefreshToken {
    const refreshToken = new RefreshToken();
    refreshToken.id = doc.id;
    refreshToken.userId = doc.userId;
    refreshToken.token = doc.token;
    return refreshToken;
  }
}
