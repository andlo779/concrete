import { Record } from './record.entity';
import { Conditions } from './conditions.entity';

export class RecordInCollection extends Record {
  conditions: Conditions;
  addedAt: Date;
}
