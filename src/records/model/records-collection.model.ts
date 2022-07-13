import { Record } from './record.model';

export class RecordsCollection {
  id: string;
  name: string;
  userId: string;
  records: Array<Record>;
  createdAt: Date;
}
