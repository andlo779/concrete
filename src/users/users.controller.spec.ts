import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { MongoModule } from '../mongo-client/mongo-module';
import { MONGO_CLIENT } from '../constants';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MongoModule],
      controllers: [UsersController],
      providers: [UsersService, UsersRepository],
    })
      .overrideProvider(MONGO_CLIENT)
      .useValue({})
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it.skip('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
