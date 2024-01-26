import { User } from '../users/model/user.model';
import { Request } from 'express';

export type RequestWithUser = Request & { user: User; tokenId: string };
