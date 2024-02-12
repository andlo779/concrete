import { TotpStrategy } from './totp.strategy';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

describe('TotpStrategy', () => {
  describe('decodeAndValidateAuthHeader()', () => {
    it('GIVEN correct input WHEN function is called THEN return a string with decoded 2fa token', () => {
      const codedToken = 'Bearer 123456';

      const result = TotpStrategy.decodeAndValidateAuthHeader(codedToken);

      expect(result).toStrictEqual('123456');
    });

    it('GIVEN empty input WHEN function is called THEN throw BadRequestException', () => {
      const codedToken = '';

      expect(() =>
        TotpStrategy.decodeAndValidateAuthHeader(codedToken),
      ).toThrow(BadRequestException);
    });

    it('GIVEN undefined input WHEN function is called THEN throw BadRequestException', () => {
      const codedToken = undefined;

      expect(() =>
        TotpStrategy.decodeAndValidateAuthHeader(codedToken),
      ).toThrow(BadRequestException);
    });

    it('GIVEN input with more then 2 blank spaces WHEN function is called THEN throw BadRequestException', () => {
      const codedToken = 'Bearer 123 456';

      expect(() =>
        TotpStrategy.decodeAndValidateAuthHeader(codedToken),
      ).toThrow(BadRequestException);
    });

    it('GIVEN input that does not start with "Bearer" WHEN function is called THEN throw BadRequestException', () => {
      const codedToken = 'Basic 123456';

      expect(() =>
        TotpStrategy.decodeAndValidateAuthHeader(codedToken),
      ).toThrow(BadRequestException);
    });

    it('GIVEN input with totpToken has LESS then 6 characters WHEN function is called THEN throw BadRequestException', () => {
      const codedToken = 'Bearer 1234';

      expect(() =>
        TotpStrategy.decodeAndValidateAuthHeader(codedToken),
      ).toThrow(BadRequestException);
    });

    it('GIVEN input with totpToken has MORE then 6 characters WHEN function is called THEN throw BadRequestException', () => {
      const codedToken = 'Bearer 1234567';

      expect(() =>
        TotpStrategy.decodeAndValidateAuthHeader(codedToken),
      ).toThrow(BadRequestException);
    });
  });

  describe('getAndValidateSessionIdFromUrlPath()', () => {
    it('GIVEN url-path with "auth-session/:sessionId" WHEN calling function THEN return the sessionId', () => {
      const path =
        '/auth/token/auth-session/aab1affd-92af-4726-b4f6-207ee91cc6fd';

      const result = TotpStrategy.getAndValidateSessionIdFromUrlPath(path);

      expect(result).toStrictEqual('aab1affd-92af-4726-b4f6-207ee91cc6fd');
    });

    it('GIVEN empty-url path WHEN calling function THEN throw InternalServerErrorException', () => {
      const path = '';

      expect(() =>
        TotpStrategy.getAndValidateSessionIdFromUrlPath(path),
      ).toThrow(InternalServerErrorException);
    });

    it('GIVEN undefined url-path WHEN calling function THEN throw InternalServerErrorException', () => {
      const path = undefined;

      expect(() =>
        TotpStrategy.getAndValidateSessionIdFromUrlPath(path),
      ).toThrow(InternalServerErrorException);
    });

    it('GIVEN url-path without "authSession" section WHEN calling function THEN throw InternalServerErrorException', () => {
      const path = 'test/this/path/wil/not/work';

      expect(() =>
        TotpStrategy.getAndValidateSessionIdFromUrlPath(path),
      ).toThrow(InternalServerErrorException);
    });

    it('GIVEN url-path without sessionId WHEN calling function THEN throw InternalServerErrorException', () => {
      const path = 'test/authSession';

      expect(() =>
        TotpStrategy.getAndValidateSessionIdFromUrlPath(path),
      ).toThrow(InternalServerErrorException);
    });

    it('GIVEN url-path with sessionId that is of wrong format WHEN calling function THEN throw InternalServerErrorException', () => {
      const path = 'test/authSession/123456789';

      expect(() =>
        TotpStrategy.getAndValidateSessionIdFromUrlPath(path),
      ).toThrow(InternalServerErrorException);
    });
  });
});
