export class User {
  userId: string;
  name: string;
  email: string;
  password: string;
  twoFactorAuthSecret: string;
  twoFactorAuthEnabled = false;
  createdAt: Date;

  isTwoFactorAuthEnabled(): boolean {
    return this.twoFactorAuthEnabled;
  }

  hasTwoFactorAuthSecrete(): boolean {
    return !!this.twoFactorAuthSecret;
  }
}
