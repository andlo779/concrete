import { Injectable, NotFoundException } from '@nestjs/common';
import { RecordsCollectionRepository } from './records-collection.repository';
import { RecordsCollection } from './entities/records-collection.entity';
import { RecordsWishlist } from './entities/records.wishlist';
import { randomUUID } from 'crypto';
import { RecordInCollection } from './entities/record-in-collection.entity';
import { Record } from './entities/record.entity';

@Injectable()
export class RecordsService {
  constructor(
    private readonly recordsCollectionRepository: RecordsCollectionRepository,
  ) {}

  async createCollection(userId: string): Promise<RecordsCollection> {
    const collection = new RecordsCollection();
    collection.id = randomUUID();
    collection.userId = userId;
    collection.records = new Array<RecordInCollection>();
    collection.createdAt = new Date();

    return await this.recordsCollectionRepository.insert(collection);
  }

  async createWishlist(userId: string): Promise<RecordsWishlist> {
    const wishlist = new RecordsWishlist();
    wishlist.id = randomUUID();
    wishlist.userId = userId;
    wishlist.records = new Array<Record>();
    wishlist.createdAt = new Date();

    //Todo: Save wishlist in DB!
    return wishlist;
  }

  async getCollection(id: string): Promise<RecordsCollection> {
    const collection = this.recordsCollectionRepository.findOneById(id);
    if (collection) {
      return collection;
    }
    throw new NotFoundException();
  }

  async getWishlist(id: string): Promise<RecordsWishlist> {
    return Promise.reject();
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
    const collection = await this.recordsCollectionRepository.findOneById(
      collectionId,
    );
    if (!collection) {
      throw new NotFoundException();
    }

    const newRecord = new RecordInCollection();
    newRecord.id = randomUUID();
    newRecord.name = record.name;
    newRecord.artist = record.artist;
    newRecord.imageUrl = record.imageUrl;
    newRecord.productionYear = record.productionYear;
    newRecord.printedYear = record.printedYear;
    newRecord.addedAt = new Date();

    collection.records.push(newRecord);
    return await this.recordsCollectionRepository.update(collection);
  }

  async addRecordToWishlist(
    wishlistId: string,
    record: Record,
  ): Promise<RecordsWishlist> {
    return Promise.reject();
  }
}
