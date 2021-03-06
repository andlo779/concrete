import { RecordsCollection } from './model/records-collection.model';
import { Record } from './model/record.model';
import { RecordsCollectionMapper } from './records-collection.mapper';
import { deserialize, serialize } from 'bson';

function generateRecordsCollectionWithOneRecord(): RecordsCollection {
  const recordsCollection = new RecordsCollection();
  recordsCollection.id = '1';
  recordsCollection.name = 'test collection';
  recordsCollection.userId = 'testUser';
  recordsCollection.records = new Array<Record>();
  recordsCollection.createdAt = new Date();

  const record = new Record();
  record.id = '9';
  record.name = 'test record';
  record.artist = 'test artist';
  record.productionYear = '1999';
  record.printedYear = '2000';
  record.imageUrl = 'www.test-images.com/my/test/image.png';
  record.addedAt = new Date();
  recordsCollection.records.push(record);
  return recordsCollection;
}

describe('RecordCollectionMapper', () => {
  describe('modelToDto', () => {
    it('given a correct model when calling function then a correct dto is returned', () => {
      const recordsCollection = generateRecordsCollectionWithOneRecord();
      const record = recordsCollection.records.pop();
      recordsCollection.records.push(record);

      const result = RecordsCollectionMapper.modelToDto(recordsCollection);
      const mappedRecord = result.records.pop();
      result.records.push(mappedRecord);

      expect(result).toBeDefined();
      expect(result.name).toBe(recordsCollection.name);
      expect(result.id).toBe(recordsCollection.id);
      expect(result.userId).toBe(recordsCollection.userId);
      expect(result.records.length).toBe(1);

      expect(mappedRecord.id).toBe(record.id);
      expect(mappedRecord.name).toBe(record.name);
      expect(mappedRecord.artist).toBe(record.artist);
      expect(mappedRecord.printedYear).toBe(record.printedYear);
      expect(mappedRecord.productionYear).toBe(record.productionYear);
      expect(mappedRecord.imageUrl).toBe(record.imageUrl);
      expect(mappedRecord.addedAt).toBe(record.addedAt);
    });
  });

  describe('documentToModel', () => {
    it('', () => {
      const recordsCollection = generateRecordsCollectionWithOneRecord();
      const doc = deserialize(serialize(recordsCollection));
      const result = RecordsCollectionMapper.documentToModel(doc);

      expect(result).toStrictEqual(recordsCollection);
    });
  });
});
