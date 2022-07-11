import { AddRecordRequest } from './dto/add-record.request';
import { RecordInCollection } from './entities/record-in-collection.entity';

export class RecordMapper {
  static dtoToRecordInCollection(dto: AddRecordRequest): RecordInCollection {
    const record = new RecordInCollection();
    record.name = dto.name;
    record.artist = dto.artist;
    record.imageUrl = dto.imageUrl;
    record.productionYear = dto.productionYear;
    record.printedYear = dto.printedYear;
    return record;
  }
}
