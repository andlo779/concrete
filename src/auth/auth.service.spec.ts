import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { mock, mockReset } from 'jest-mock-extended';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthSessionService } from '../authSession/auth-session.service';
import { TotpService } from './totp.service';

describe('AuthService', () => {
  const mockConfService = mock<ConfigService>();
  const mockUserService = mock<UsersService>();
  const mockJwtService = mock<JwtService>();
  const mockAuthSessionService = mock<AuthSessionService>();
  const mockTotpService = mock<TotpService>();
  mockConfService.getOrThrow<string>.mockReturnValueOnce('abcdef');

  const service = new AuthService(
    mockConfService,
    mockUserService,
    mockJwtService,
    mockAuthSessionService,
    mockTotpService,
  );

  beforeEach(async () => {
    mockReset(mockConfService);
    mockReset(mockUserService);
    mockReset(mockJwtService);
  });

  it('GIVEN correct set-up THEN service is created', () => {
    expect(service).toBeDefined();
  });
});
