import { Conditions } from './conditions.model';

export class Record {
  id: string;
  artist: string;
  name: string;
  productionYear: string;
  printedYear: string;
  imageUrl: string;
  //conditions: Conditions;
  addedAt: Date;
}
