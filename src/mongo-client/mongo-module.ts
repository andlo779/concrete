import { Logger, Module } from '@nestjs/common';
import { Db, MongoClient } from 'mongodb';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DATABASE_CONNECTION, DATABASE_NAME, MONGO_CLIENT } from '../constants';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      inject: [ConfigService],
      provide: MONGO_CLIENT,
      useFactory: async (configService: ConfigService): Promise<Db> => {
        const logger = new Logger(MONGO_CLIENT);
        try {
          const databaseConnection =
            configService.get<string>(DATABASE_CONNECTION);
          const databaseName = configService.get<string>(DATABASE_NAME);

          const client = await MongoClient.connect(databaseConnection);
          logger.log('Connected to MongoDb');
          return client.db(databaseName);
        } catch (e) {
          throw e;
        }
      },
    },
  ],
  exports: [MONGO_CLIENT],
})
export class MongoModule {}
