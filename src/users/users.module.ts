import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UsersRepository } from './model/users.repository';
import { MongoModule } from '../mongo-client/mongo-module';
import { UsersController } from './api/users.controller';
import { TotpService } from './service/totp.service';

@Module({
  imports: [MongoModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, TotpService],
  exports: [UsersService, TotpService],
})
export class UsersModule {}
