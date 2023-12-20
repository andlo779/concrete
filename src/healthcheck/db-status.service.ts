import { Inject, Injectable, Logger } from '@nestjs/common';
import { Db } from 'mongodb';
import { MONGO_PING_CLIENT } from '../constants';

@Injectable()
export class DbStatusService {
  logger = new Logger(DbStatusService.name);
  constructor(@Inject(MONGO_PING_CLIENT) private readonly db: Db) {}

  async isDbUp(): Promise<boolean> {
    try {
      await this.db.stats();
      return true;
    } catch (error) {
      this.logger.warn('Could not ping Db');
    }
    return false;
  }
}
