import { UsersService } from './users.service';
import { UsersRepository } from '../model/users.repository';
import { mock, mockReset } from 'jest-mock-extended';
import { TotpService } from './totp.service';

describe('UsersService', () => {
  const mockUserRepository = mock<UsersRepository>();
  const mockTotpService = mock<TotpService>();
  const service = new UsersService(mockUserRepository, mockTotpService);

  beforeEach(async () => {
    mockReset(mockUserRepository);
    mockReset(mockTotpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
