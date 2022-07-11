import { RecordsCollection } from './entities/records-collection.entity';
import { RecordsCollectionResponse } from './dto/records-collection.response';
import { RecordInCollection } from './entities/record-in-collection.entity';
import { RecordsInCollectionResponse } from './dto/records-in-collection.response';

export class RecordsCollectionMapper {
  static domainToDto(collection: RecordsCollection): RecordsCollectionResponse {
    const dto = new RecordsCollectionResponse();
    dto.id = collection.id;
    dto.userId = collection.userId;
    dto.records = collection.records.map(this.recordInCollectionToDto);
    return dto;
  }

  static documentToDomain(doc: any): RecordsCollection {
    const recordCollection = new RecordsCollection();
    recordCollection.id = doc.id;
    recordCollection.userId = doc.userId;
    recordCollection.createdAt = doc.createdAt;
    recordCollection.records = doc.records.map(this.recordDocToDomain);
    return recordCollection;
  }

  private static recordInCollectionToDto(
    record: RecordInCollection,
  ): RecordsInCollectionResponse {
    const dto = new RecordsInCollectionResponse();
    dto.id = record.id;
    dto.artist = record.artist;
    dto.name = record.name;
    dto.productionYear = record.productionYear;
    dto.printedYear = record.printedYear;
    dto.imageUrl = record.imageUrl;
    dto.addedAt = record.addedAt;
    return dto;
  }

  private static recordDocToDomain(doc: any): RecordInCollection {
    const record = new RecordInCollection();
    record.id = doc.id;
    record.name = doc.name;
    record.artist = doc.artist;
    record.productionYear = doc.productionYear;
    record.printedYear = doc.printedYear;
    record.imageUrl = doc.imageUrl;
    return record;
  }
}
