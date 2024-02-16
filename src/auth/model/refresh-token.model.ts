import { BaseModel } from '../../shared/base-model.abstract';

export class RefreshToken extends BaseModel {
  private readonly _userId: string;
  private readonly _token: string;
  private readonly _ttl: number;

  constructor(userId: string, token: string, ttl: number);
  constructor(
    userId: string,
    token: string,
    ttl: number,
    id: string,
    createdAt: Date,
    updatedAt: Date,
  );
  constructor(
    userId: string,
    token: string,
    ttl: number,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    super(id, createdAt, updatedAt);
    this._userId = userId;
    this._token = token;
    this._ttl = ttl;
  }

  get userId(): string {
    return this._userId;
  }

  get token(): string {
    return this._token;
  }

  get ttl(): number {
    return this._ttl;
  }
}
