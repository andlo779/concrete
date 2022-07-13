import { Inject, Injectable } from '@nestjs/common';
import { MONGO_CLIENT, MONGO_COLLECTION_USERS } from '../constants';
import { Collection, Db } from 'mongodb';
import { User } from './user.model';
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
    return await this.collection.findOne<User>({ userId: id });
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.collection.findOne<User>({ name: username });
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
    return UsersMapper.documentToDomain(result.value);
  }
}
