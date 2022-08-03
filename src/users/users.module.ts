import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { MongoModule } from '../mongo-client/mongo-module';
import { UsersController } from './users.controller';
import { TotpModule } from '../auth/totp/totp.module';

@Module({
  imports: [MongoModule, TotpModule],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
