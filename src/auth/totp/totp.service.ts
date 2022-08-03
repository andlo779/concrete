import { Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import { authenticator as authDataGen } from '@otplib/preset-default';

Injectable();
export class TotpService {
  generateSecrete(): string {
    return authenticator.generateSecret();
  }

  generateQrUri(userName: string, secret: string): string {
    return authDataGen.keyuri(userName, 'concrete', secret);
  }

  validateToken(token: string, secret: string): boolean {
    return authenticator.check(token, secret);
  }
}
