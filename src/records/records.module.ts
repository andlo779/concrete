import { AuthModule } from '../auth/auth.module';
import { Module } from '@nestjs/common';
import { RecordsService } from './records.service';
import { RecordsController } from './records.controller';
import { RecordsCollectionRepository } from './records-collection.repository';
import { MongoModule } from '../mongo-client/mongo-module';

@Module({
  imports: [MongoModule, AuthModule],
  providers: [RecordsService, RecordsCollectionRepository],
  controllers: [RecordsController],
})
export class RecordsModule {}
