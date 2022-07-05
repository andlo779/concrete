import { ObjectId } from 'mongodb';

export class User {
  _id: ObjectId;
  userId: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}
