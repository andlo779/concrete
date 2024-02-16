import { randomUUID } from 'crypto';

export abstract class BaseModel {
  private _xxid: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  protected constructor();
  protected constructor(id: string, createdAt: Date, updatedAt: Date);
  protected constructor(id?: string, createdAt?: Date, updatedAt?: Date) {
    this._xxid = id ? id : randomUUID();
    const newDate = new Date();
    this._createdAt = createdAt ? createdAt : newDate;
    this._updatedAt = updatedAt ? updatedAt : newDate;
  }

  get xxid(): string {
    return this._xxid;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set xxid(value: string) {
    this._xxid = value;
  }

  set createdAt(value: Date) {
    this._createdAt = value;
  }

  set updatedAt(value: Date) {
    this._updatedAt = value;
  }
}
