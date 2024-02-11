import { Request } from 'express';

export type User = {
  tokenId?: string;
  userId?: string;
};

export type RequestWithUser = Request & {
  user?: User;
};
