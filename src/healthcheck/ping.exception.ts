export class PingException extends Error {
  constructor(msg: string) {
    super(msg);
    // Object.setPrototypeOf(this, BadError.prototype);
  }

  message: string;
  name: string;
}
