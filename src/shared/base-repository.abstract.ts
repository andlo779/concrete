import { Collection, Db, Document } from 'mongodb';
import { BaseModel } from './base-model.abstract';

export abstract class BaseRepository<T extends BaseModel> {
  protected collection: Collection;
  protected constructor(
    protected db: Db,
    protected collectionName: string,
    protected fromDoc: (doc: Document) => T,
  ) {
    this.collection = db.collection(collectionName);
  }

  async insert(entity: T): Promise<void> {
    const doc = this.toValidatedDoc(entity);
    await this.collection.insertOne(doc);
  }
  async update(entity: T): Promise<void> {
    const doc = this.toValidatedDoc(entity);
    await this.collection.replaceOne({ id: entity.id }, doc, { upsert: false });
  }

  async delete(id: string): Promise<void> {
    await this.collection.findOneAndDelete({ id: id });
  }

  async findById(id: string): Promise<T | null> {
    const doc = await this.collection.findOne({ id: id });
    return doc ? this.fromDoc(doc) : null;
  }

  async findAll(): Promise<T[]> {
    const docs = await this.collection.find({}).toArray();
    return docs.map(this.fromDoc);
  }

  private toValidatedDoc(entity: T): Document {
    const doc = entity.toDoc();
    this.validateIdentifier(doc);
    return doc;
  }

  private validateIdentifier(doc: Document): asserts doc is { id: string } {
    if (!doc.id || typeof doc.id !== 'string') {
      throw new Error(`Missing property "id"`);
    }
  }
}
