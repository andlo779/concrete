import { RecordsCollection } from './model/records-collection.model';
import { RecordsCollectionResponse } from './dto/records-collection.response';
import { RecordResponse } from './dto/record.response';
import { Record } from './model/record.model';
import { Document } from 'mongodb';

export class RecordsCollectionMapper {
  static modelToDto(collection: RecordsCollection): RecordsCollectionResponse {
    const dto = new RecordsCollectionResponse();
    dto.id = collection.id;
    dto.name = collection.name;
    dto.userId = collection.userId;
    dto.records = collection.records.map(this.recordToDto);
    return dto;
  }

  static documentToModel(doc: Document): RecordsCollection {
    const recordCollection = new RecordsCollection();
    recordCollection.id = doc.id;
    recordCollection.name = doc.name;
    recordCollection.userId = doc.userId;
    recordCollection.createdAt = doc.createdAt;
    recordCollection.records = doc.records.map(this.recordDocToDomain);
    return recordCollection;
  }

  private static recordToDto(record: Record): RecordResponse {
    const dto = new RecordResponse();
    dto.id = record.id;
    dto.artist = record.artist;
    dto.name = record.name;
    dto.productionYear = record.productionYear;
    dto.printedYear = record.printedYear;
    dto.imageUrl = record.imageUrl;
    dto.addedAt = record.addedAt;
    return dto;
  }

  private static recordDocToDomain(doc: Document): Record {
    const record = new Record();
    record.id = doc.id;
    record.name = doc.name;
    record.artist = doc.artist;
    record.productionYear = doc.productionYear;
    record.printedYear = doc.printedYear;
    record.imageUrl = doc.imageUrl;
    record.addedAt = doc.addedAt;
    return record;
  }
}
