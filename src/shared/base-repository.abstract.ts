import { Collection, Db } from 'mongodb';
import { BaseModel } from './base-model.abstract';

export abstract class BaseRepository<T extends BaseModel> {
  protected collection: Collection<BaseModel>;
  protected constructor(
    protected db: Db,
    protected collectionName: string,
    // protected fromDoc: (doc: Document) => T,
  ) {
    this.collection = db.collection<BaseModel>(collectionName);
  }

  async insert(entity: T): Promise<void> {
    await this.collection.insertOne(entity);
  }
  async update(entity: T): Promise<void> {
    await this.collection.findOneAndUpdate(
      { xxid: entity.xxid },
      { $set: entity },
      { returnDocument: 'after' },
    );
  }

  async delete(id: string): Promise<void> {
    await this.collection.findOneAndDelete({ xxid: id });
  }

  async findById(id: string): Promise<T | null> {
    return this.collection.findOne<T>({ xxid: id });
  }

  async findAll(): Promise<T[]> {
    return this.collection.find<T>({}).toArray();
  }
}
