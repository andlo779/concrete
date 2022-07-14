import { Logger, Module } from '@nestjs/common';
import { HealthcheckController } from './healthcheck.controller';
import { DbStatusService } from './db-status.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  DATABASE_CONNECTION,
  DATABASE_NAME,
  MONGO_PING_CLIENT,
} from '../constants';
import { Db, MongoClient } from 'mongodb';

@Module({
  imports: [ConfigModule],
  controllers: [HealthcheckController],
  providers: [
    DbStatusService,
    {
      inject: [ConfigService],
      provide: MONGO_PING_CLIENT,
      useFactory: async (configService: ConfigService): Promise<Db> => {
        const logger = new Logger(MONGO_PING_CLIENT);
        try {
          const databaseConnection =
            configService.get<string>(DATABASE_CONNECTION);
          const databaseName = configService.get<string>(DATABASE_NAME);

          const client = await MongoClient.connect(databaseConnection, {
            connectTimeoutMS: 500,
            keepAlive: false,
            serverSelectionTimeoutMS: 500,
            maxPoolSize: 1,
          });
          logger.log('Connected to MongoDb');
          return client.db(databaseName);
        } catch (e) {
          throw e;
        }
      },
    },
  ],
})
export class HealthcheckModule {}
