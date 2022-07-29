import { Inject, Injectable } from '@nestjs/common';
import {
  MONGO_CLIENT,
  MONGO_COLLECTION_RECORDS_COLLECTION,
} from '../constants';
import { Collection, Db } from 'mongodb';
import { RepositoryInterface } from '../repository.interface';
import { RecordsCollectionMapper } from './records-collection.mapper';
import { RecordsCollection } from './model/records-collection.model';

@Injectable()
export class RecordsCollectionRepository
  implements RepositoryInterface<RecordsCollection>
{
  collection: Collection;
  constructor(@Inject(MONGO_CLIENT) db: Db) {
    this.collection = db.collection(MONGO_COLLECTION_RECORDS_COLLECTION);
  }

  async findAll(): Promise<RecordsCollection[]> {
    const docs = await this.collection.find<RecordsCollection>({}).toArray();
    return docs.map(RecordsCollectionMapper.documentToModel);
  }

  async findOneById(id: string): Promise<RecordsCollection> {
    const doc = await this.collection.findOne<RecordsCollection>({ id: id });
    if (doc) {
      return RecordsCollectionMapper.documentToModel(doc);
    }
    return undefined;
  }

  async insert(record: RecordsCollection): Promise<RecordsCollection> {
    const result = await this.collection.insertOne(record);
    if (result.acknowledged) {
      return record;
    }
    return undefined;
  }

  async update(record: RecordsCollection): Promise<RecordsCollection> {
    const result = await this.collection.findOneAndUpdate(
      { id: record.id },
      { $set: { ...record } },
      { returnDocument: 'after' },
    );
    if (result.ok) {
      return RecordsCollectionMapper.documentToModel(result.value);
    }
    return undefined;
  }
}
