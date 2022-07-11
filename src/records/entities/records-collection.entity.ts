import { RecordInCollection } from './record-in-collection.entity';

export class RecordsCollection {
  id: string;
  userId: string;
  records: Array<RecordInCollection>;
  createdAt: Date;
}
