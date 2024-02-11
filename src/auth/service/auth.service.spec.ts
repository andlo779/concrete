import { AuthService } from './auth.service';
import { mock, mockReset } from 'jest-mock-extended';
import { UsersService } from '../../users/users.service';
import { AuthSessionService } from '../authSession/auth-session.service';
import { TotpService } from '../totp/totp.service';
import { TokenService } from './token.service';

describe('AuthService', () => {
  const mockUserService = mock<UsersService>();
  const mockAuthSessionService = mock<AuthSessionService>();
  const mockTotpService = mock<TotpService>();
  const mockTokenService = mock<TokenService>();

  const service = new AuthService(
    mockUserService,
    mockAuthSessionService,
    mockTotpService,
    mockTokenService,
  );

  beforeEach(async () => {
    mockReset(mockUserService);
    mockReset(mockAuthSessionService);
    mockReset(mockTotpService);
    mockReset(mockTokenService);
  });

  it('GIVEN correct set-up THEN service is created', () => {
    expect(service).toBeDefined();
  });
});
