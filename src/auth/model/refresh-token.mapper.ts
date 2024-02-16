import { RefreshToken } from './refresh-token.model';
import { Document } from 'mongodb';

export class RefreshTokenMapper {
  static documentToModel(doc: Document): RefreshToken {
    return new RefreshToken(
      doc.id,
      doc.userId,
      doc.token,
      doc.ttl,
      doc.createdAt,
      doc.updatedAt,
    );
  }
}
