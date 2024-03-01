import { Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import { authenticator as authDataGen } from '@otplib/preset-default';
import { ConfigService } from '@nestjs/config';
import { AUTH_ISSUER } from '../../constants';

Injectable();
export class TotpService {
  constructor(private readonly configService: ConfigService) {}
  generateSecrete(): string {
    return authenticator.generateSecret();
  }

  generateQrUri(userName: string, secret: string): string {
    const issuer = this.configService.get<string>(AUTH_ISSUER);
    return authDataGen.keyuri(userName, issuer, secret);
  }

  validateToken(token: string, secret: string): boolean {
    return authenticator.check(token, secret);
  }
}
