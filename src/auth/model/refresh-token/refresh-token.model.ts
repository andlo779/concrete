import { BaseModel } from '../../../shared/base-model.abstract';
import { randomUUID } from 'crypto';
import { Document } from 'mongodb';

export class RefreshToken extends BaseModel {
  private readonly _userId: string;
  private readonly _token: string;
  private readonly _expiresAt: Date;

  constructor(userId: string, expiresAt: Date);
  constructor(
    userId: string,
    expiresAt: Date,
    token: string,
    id: string,
    createdAt: Date,
    updatedAt: Date,
  );
  constructor(
    userId: string,
    expiresAt: Date,
    token?: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    super(id, createdAt, updatedAt);
    this._userId = userId;
    this._token = token ?? randomUUID();
    this._expiresAt = expiresAt;
  }

  toDoc(): Document {
    return {
      ...super.toDoc(),
      userId: this.userId,
      token: this.token,
      expiresAt: this.expiresAt,
    };
  }

  static fromDoc(doc: Document): RefreshToken {
    return new RefreshToken(
      doc.userId,
      doc.expiresAt,
      doc.token,
      doc.id,
      doc.createdAt,
      doc.updatedAt,
    );
  }

  get userId(): string {
    return this._userId;
  }

  get token(): string {
    return this._token;
  }

  get expiresAt(): Date {
    new Date(Date.now() + 2 * (60 * 60 * 1000));
    return this._expiresAt;
  }
}
