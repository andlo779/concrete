import { Inject, Injectable } from '@nestjs/common';
import {
  MONGO_CLIENT,
  MONGO_COLLECTION_AUTH_REFRESH_TOKEN,
} from '../../../constants';
import { Db } from 'mongodb';
import { RefreshToken } from './refresh-token.model';
import { BaseRepository } from '../../../shared/base-repository.abstract';

@Injectable()
export class RefreshTokenRepository extends BaseRepository<RefreshToken> {
  constructor(@Inject(MONGO_CLIENT) db: Db) {
    super(db, MONGO_COLLECTION_AUTH_REFRESH_TOKEN, RefreshToken.fromDoc);
  }

  async findOneByToken(token: string): Promise<RefreshToken | null> {
    const result = await this.collection.findOne({
      token: token,
    });
    return RefreshToken.fromDoc(result);
  }

  async deleteAllByUserId(userId: string): Promise<void> {
    await this.collection.deleteMany({ userId: userId });
  }
}
