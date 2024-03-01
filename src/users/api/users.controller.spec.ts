import { UsersController } from './users.controller';
import { UsersService } from '../service/users.service';
import { mock, mockReset } from 'jest-mock-extended';

describe('UsersController', () => {
  const mockUsersService = mock<UsersService>();
  const controller = new UsersController(mockUsersService);

  beforeEach(async () => {
    mockReset(mockUsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
