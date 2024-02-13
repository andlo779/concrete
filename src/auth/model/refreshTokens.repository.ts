import { Inject, Injectable } from '@nestjs/common';
import {
  MONGO_CLIENT,
  MONGO_COLLECTION_AUTH_REFRESH_TOKEN,
} from '../../constants';
import { Collection, Db } from 'mongodb';
import { RepositoryInterface } from '../../repository.interface';
import { RefreshToken } from './refresh.token';
import { RefreshTokenMapper } from './refresh-token.mapper';

@Injectable()
export class RefreshTokensRepository
  implements RepositoryInterface<RefreshToken>
{
  private collection: Collection<RefreshToken>;

  constructor(@Inject(MONGO_CLIENT) db: Db) {
    this.collection = db.collection(MONGO_COLLECTION_AUTH_REFRESH_TOKEN);
  }

  async findAll(): Promise<RefreshToken[]> {
    const docs = await this.collection.find<RefreshToken>({}).toArray();
    return docs.map(RefreshTokenMapper.documentToModel);
  }

  async findOneById(id: string): Promise<RefreshToken> {
    const doc = await this.collection.findOne<RefreshToken>({ id: id });
    if (doc) {
      return RefreshTokenMapper.documentToModel(doc);
    }
    return undefined;
  }

  async findByUserId(userId: string): Promise<RefreshToken> {
    const doc = await this.collection.findOne<RefreshToken>({ userId: userId });
    if (doc) {
      return RefreshTokenMapper.documentToModel(doc);
    }
    return undefined;
  }

  async insert(refreshToken: RefreshToken): Promise<RefreshToken> {
    const result = await this.collection.insertOne(refreshToken);
    if (result.acknowledged) {
      return refreshToken;
    }
    return undefined;
  }

  async update(refreshToken: RefreshToken): Promise<RefreshToken> {
    const result = await this.collection.findOneAndUpdate(
      { id: refreshToken.id },
      { $set: { ...refreshToken } },
      { returnDocument: 'after', includeResultMetadata: true },
    );
    if (result.ok) {
      return RefreshTokenMapper.documentToModel(result.value);
    }
    return undefined;
  }

  async remove(id: string): Promise<void> {
    await this.collection.deleteOne({ id: id });
  }

  async removeByUserId(userId: string): Promise<void> {
    await this.collection.deleteOne({ userId: userId });
  }
}
