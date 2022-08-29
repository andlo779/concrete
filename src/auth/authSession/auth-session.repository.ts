import { RepositoryInterface } from '../../repository.interface';
import { AuthSession } from './model/auth-session.model';
import { Inject, Injectable } from '@nestjs/common';
import { MONGO_CLIENT, MONGO_COLLECTION_AUTH_SESSION } from '../../constants';
import { Collection, Db } from 'mongodb';
import { AuthSessionMapper } from './auth-session.mapper';

@Injectable()
export class AuthSessionRepository implements RepositoryInterface<AuthSession> {
  collection: Collection<AuthSession>;

  constructor(@Inject(MONGO_CLIENT) db: Db) {
    this.collection = db.collection(MONGO_COLLECTION_AUTH_SESSION);
  }

  async findAll(): Promise<AuthSession[]> {
    const docs = await this.collection.find<AuthSession>({}).toArray();
    return docs.map(AuthSessionMapper.documentToModel);
  }

  async findOneById(id: string): Promise<AuthSession> {
    const doc = await this.collection.findOne<AuthSession>({ id: id });
    if (doc) {
      return AuthSessionMapper.documentToModel(doc);
    }
    return undefined;
  }

  async findByUserId(userId: string): Promise<AuthSession> {
    const doc = await this.collection.findOne<AuthSession>({ userId: userId });
    if (doc) {
      return AuthSessionMapper.documentToModel(doc);
    }
    return undefined;
  }

  async insert(session: AuthSession): Promise<AuthSession> {
    const result = await this.collection.insertOne(session);
    if (result.acknowledged) {
      return session;
    }
    return undefined;
  }

  async update(session: AuthSession): Promise<AuthSession> {
    const result = await this.collection.findOneAndUpdate(
      { id: session.id },
      { $set: { ...session } },
      { returnDocument: 'after' },
    );
    if (result.ok) {
      return AuthSessionMapper.documentToModel(result.value);
    }
    return undefined;
  }

  async remove(id: string) {
    await this.collection.deleteOne({ id: id });
  }
}
