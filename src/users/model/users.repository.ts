import { Inject, Injectable } from '@nestjs/common';
import { MONGO_CLIENT, MONGO_COLLECTION_USERS } from '../../constants';
import { Collection, Db } from 'mongodb';
import { User } from './user.model';
import { UsersMapper } from './users.mapper';
import { RepositoryInterface } from '../../repository.interface';

@Injectable()
export class UsersRepository implements RepositoryInterface<User> {
  private collection: Collection<User>;

  constructor(@Inject(MONGO_CLIENT) db: Db) {
    this.collection = db.collection(MONGO_COLLECTION_USERS);
  }

  async findAll(): Promise<User[]> {
    const docs = await this.collection.find<User>({}).toArray();
    return docs.map(UsersMapper.documentToModel);
  }

  async findOneById(id: string): Promise<User> {
    const doc = await this.collection.findOne({ userId: id });
    if (doc) {
      return UsersMapper.documentToModel(doc);
    }
    return undefined;
  }

  async findOneByUsername(username: string): Promise<User> {
    const doc = await this.collection.findOne({ name: username });
    if (doc) {
      return UsersMapper.documentToModel(doc);
    }
    return undefined;
  }

  async insert(user: User): Promise<User> {
    const result = await this.collection.insertOne(user);
    if (result.acknowledged) {
      return user;
    }
    return undefined;
  }

  async update(user: User): Promise<User> {
    const result = await this.collection.findOneAndUpdate(
      { name: user.name },
      { $set: { ...user } },
      { returnDocument: 'after', includeResultMetadata: true },
    );
    if (result.ok) {
      return UsersMapper.documentToModel(result.value);
    }
    return undefined;
  }
}
