import { Injectable, NotFoundException } from '@nestjs/common';
import { RecordsCollectionRepository } from './records-collection.repository';
import { RecordsCollection } from './model/records-collection.model';
import { randomUUID } from 'crypto';
import { Condition, Record } from './model/record.model';

@Injectable()
export class RecordsService {
  constructor(
    private readonly recordsCollectionRepository: RecordsCollectionRepository,
  ) {}

  async createCollection(
    userId: string,
    name: string,
  ): Promise<RecordsCollection> {
    const collection = new RecordsCollection();
    collection.id = randomUUID();
    collection.userId = userId;
    collection.name = name;
    collection.records = new Array<Record>();
    collection.createdAt = new Date();

    return await this.recordsCollectionRepository.insert(collection);
  }

  async getCollection(id: string): Promise<RecordsCollection> {
    const collection = await this.recordsCollectionRepository.findOneById(id);
    if (collection) {
      return collection;
    }
    throw new NotFoundException();
  }

  async addRecordToCollection(
    collectionId: string,
    record: {
      name: string;
      artist: string;
      productionYear: string;
      printedYear: string;
      imageUrl: string;
    },
  ): Promise<RecordsCollection> {
    const collection =
      await this.recordsCollectionRepository.findOneById(collectionId);
    if (!collection) {
      throw new NotFoundException();
    }

    // ToDo: create a mapping function that is unit tested
    const newRecord = new Record();
    newRecord.id = randomUUID();
    newRecord.name = record.name;
    newRecord.artist = record.artist;
    newRecord.imageUrl = record.imageUrl;
    newRecord.productionYear = record.productionYear;
    newRecord.printedYear = record.printedYear;
    newRecord.condition = Condition.G;
    newRecord.addedAt = new Date();

    collection.records.push(newRecord);
    return await this.recordsCollectionRepository.update(collection);
  }

  async changeCollectionName(
    collectionId: string,
    newName: string,
  ): Promise<RecordsCollection> {
    const collection =
      await this.recordsCollectionRepository.findOneById(collectionId);
    if (!collection) {
      throw new NotFoundException();
    }
    collection.name = newName;
    return await this.recordsCollectionRepository.update(collection);
  }

  async updateRecordInCollection(
    collectionId: string,
    recordId: string,
    record: {
      artist: string;
      printedYear: string;
      imageUrl: string;
      name: string;
      productionYear: string;
    },
  ): Promise<RecordsCollection> {
    const collection =
      await this.recordsCollectionRepository.findOneById(collectionId);
    if (!collection) {
      throw new NotFoundException(
        `No collection found with given collectionId: ${collectionId}`,
      );
    }
    const foundRecord = this.getRecord(recordId, collection.records);
    if (!foundRecord) {
      throw new NotFoundException(
        `No record found with given recordId: ${recordId}`,
      );
    }

    if (record.name) {
      foundRecord.name = record.name;
    }
    if (record.artist) {
      foundRecord.artist = record.artist;
    }
    if (record.printedYear) {
      foundRecord.printedYear = record.printedYear;
    }
    if (record.productionYear) {
      foundRecord.productionYear = record.productionYear;
    }
    if (record.imageUrl) {
      foundRecord.imageUrl = record.imageUrl;
    }

    return await this.recordsCollectionRepository.update(collection);
  }

  private getRecord(id: string, records: Array<Record>): Record | undefined {
    return records.find((r) => r.id === id);
  }
}
