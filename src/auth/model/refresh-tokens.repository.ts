import { Inject, Injectable } from '@nestjs/common';
import {
  MONGO_CLIENT,
  MONGO_COLLECTION_AUTH_REFRESH_TOKEN,
} from '../../constants';
import { Db } from 'mongodb';
import { RefreshToken } from './refresh-token.model';
import { BaseRepository } from '../../shared/base-repository.abstract';

@Injectable()
export class RefreshTokensRepository extends BaseRepository<RefreshToken> {
  constructor(@Inject(MONGO_CLIENT) db: Db) {
    super(db, MONGO_COLLECTION_AUTH_REFRESH_TOKEN);
  }

  async findOneByUserId(userId: string): Promise<RefreshToken | null> {
    return this.collection.findOne<RefreshToken>({ userId: userId });
  }

  async insert(refreshToken: RefreshToken): Promise<void> {
    await this.collection.insertOne(refreshToken);
  }
}
