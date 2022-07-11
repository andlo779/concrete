import { Inject, Injectable } from '@nestjs/common';
import { MONGO_CLIENT, MONGO_COLLECTION_USERS } from '../constants';
import { Collection, Db } from 'mongodb';
import { User } from './user.entity';
import { UserMapper } from './user.mapper';

@Injectable()
export class UsersRepository {
  private collection: Collection;

  constructor(@Inject(MONGO_CLIENT) db: Db) {
    this.collection = db.collection(MONGO_COLLECTION_USERS);
  }

  async findOneByUserName(username: string): Promise<User> {
    return await this.collection.findOne<User>({ name: username });
  }

  async findAll(): Promise<User[]> {
    return await this.collection.find<User>({}).toArray();
  }

  async insert(user: User): Promise<User> {
    const result = await this.collection.insertOne(user);
    if (result.acknowledged) {
      user._id = result.insertedId;
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
    return UserMapper.documentToDomain(result.value);
  }
}
