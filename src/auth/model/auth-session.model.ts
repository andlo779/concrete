import { randomUUID } from 'crypto';

export class AuthSession {
  id: string;
  userId: string;
  ttl: number;
  createdAt: Date;

  constructor(userId: string, ttl: number);
  constructor(userId: string, ttl: number, id: string, createdAt: Date);
  constructor(userId: string, ttl: number, id?: string, createdAt?: Date) {
    this.id = id ? id : randomUUID();
    this.userId = userId;
    this.ttl = ttl;
    this.createdAt = createdAt ? createdAt : new Date();
  }

  isValid(): boolean {
    const endTime = new Date(this.createdAt.getTime() + this.ttl * 60000);
    return endTime.getTime() > new Date().getTime();
  }
}
