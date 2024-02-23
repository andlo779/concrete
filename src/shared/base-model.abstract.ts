import { randomUUID } from 'crypto';
import { Document } from 'mongodb';

export abstract class BaseModel {
  private _id: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  protected constructor();
  protected constructor(id: string, createdAt: Date, updatedAt: Date);
  protected constructor(id?: string, createdAt?: Date, updatedAt?: Date) {
    this._id = id ? id : randomUUID();
    const newDate = new Date();
    this._createdAt = createdAt ? createdAt : newDate;
    this._updatedAt = updatedAt ? updatedAt : newDate;
  }

  toDoc(): Document {
    return {
      id: this._id,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }

  get id(): string {
    return this._id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set id(value: string) {
    this._id = value;
  }

  set createdAt(value: Date) {
    this._createdAt = value;
  }

  set updatedAt(value: Date) {
    this._updatedAt = value;
  }
}
