import { Module } from '@nestjs/common';
import { AuthSessionService } from './auth-session.service';
import { AuthSessionRepository } from './auth-session.repository';
import { MongoModule } from '../../mongo-client/mongo-module';

@Module({
  imports: [MongoModule],
  providers: [AuthSessionService, AuthSessionRepository],
  exports: [AuthSessionService],
})
export class AuthSessionModule {}
