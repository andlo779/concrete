import { AuthController } from './auth.controller';
import { mock } from 'jest-mock-extended';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  const mockAuthService = mock<AuthService>();
  const controller = new AuthController(mockAuthService);

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
