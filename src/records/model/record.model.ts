export enum Condition {
  M = 'Mint',
  NM = 'Near Mint',
  'VG+' = 'Very Good Plus',
  VG = 'Very Good',
  'G+' = 'Good Plus',
  G = 'Good',
  P = 'Poor',
}
export class Record {
  id: string;
  artist: string;
  name: string;
  productionYear: string;
  printedYear: string;
  imageUrl: string;
  condition: Condition;
  addedAt: Date;
}
