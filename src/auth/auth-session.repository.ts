import { RepositoryInterface } from '../repository.interface';
import { AuthSession } from './model/auth-session.model';
import { Inject, Injectable } from '@nestjs/common';
import { MONGO_CLIENT, MONGO_COLLECTION_AUTH_SESSION } from '../constants';
import { Collection, Db } from 'mongodb';
import { AuthSessionMapper } from './auth-session.mapper';

@Injectable()
export class AuthSessionRepository implements RepositoryInterface<AuthSession> {
  collection: Collection;

  constructor(@Inject(MONGO_CLIENT) db: Db) {
    this.collection = db.collection(MONGO_COLLECTION_AUTH_SESSION);
  }

  async findAll(): Promise<AuthSession[]> {
    return await this.collection.find<AuthSession>({}).toArray();
  }

  async findOneById(id: string): Promise<AuthSession> {
    const doc = await this.collection.findOne<AuthSession>({ id: id });
    return AuthSessionMapper.documentToModel(doc);
  }

  async findByUserId(userId: string): Promise<AuthSession> {
    const doc = await this.collection.findOne<AuthSession>({ userId: userId });
    return AuthSessionMapper.documentToModel(doc);
  }

  async insert(session: AuthSession): Promise<AuthSession> {
    const result = await this.collection.insertOne(session);
    if (result.acknowledged) {
      return session;
    }
    return Promise.reject();
  }

  async update(session: AuthSession): Promise<AuthSession> {
    const result = await this.collection.findOneAndUpdate(
      { id: session.id },
      { $set: { ...session } },
      { returnDocument: 'after' },
    );
    return AuthSessionMapper.documentToModel(result.value);
  }

  async remove(id: string) {
    await this.collection.deleteOne({ id: id });
  }
}
