import { Record } from './record.entity';

export class RecordsWishlist {
  id: string;
  userId: string;
  records: Array<Record>;
  createdAt: Date;
}
