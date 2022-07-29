export class AuthSession {
  id: string;
  userId: string;
  ttl: number;
  createdAt: Date;

  isValid(): boolean {
    const endTime = new Date(this.createdAt.getTime() + this.ttl * 60000);
    const currentTime = new Date();
    return endTime.getTime() > currentTime.getTime();
  }
}
