import { Inject, Injectable } from '@nestjs/common';
import { MONGO_CLIENT, MONGO_COLLECTION_USERS } from '../constants';
import { Collection, Db } from 'mongodb';
import { User } from './model/user.model';
import { UsersMapper } from './users.mapper';
import { RepositoryInterface } from '../repository.interface';

@Injectable()
export class UsersRepository implements RepositoryInterface<User> {
  private collection: Collection;

  constructor(@Inject(MONGO_CLIENT) db: Db) {
    this.collection = db.collection(MONGO_COLLECTION_USERS);
  }

  async findAll(): Promise<User[]> {
    return await this.collection.find<User>({}).toArray();
  }

  async findOneById(id: string): Promise<User> {
    const doc = await this.collection.findOne({ userId: id });
    if (doc) {
      return UsersMapper.documentToModel(doc);
    }
    await Promise.reject();
  }

  async findOneByUsername(username: string): Promise<User> {
    const doc = await this.collection.findOne({ name: username });
    if (doc) {
      return UsersMapper.documentToModel(doc);
    }
    await Promise.reject();
  }

  async insert(user: User): Promise<User> {
    const result = await this.collection.insertOne(user);
    if (result.acknowledged) {
      return user;
    }
    return Promise.reject();
  }

  async update(user: User): Promise<User> {
    const result = await this.collection.findOneAndUpdate(
      { name: user.name },
      { $set: { ...user } },
      { returnDocument: 'after' },
    );
    return UsersMapper.documentToModel(result.value);
  }
}
