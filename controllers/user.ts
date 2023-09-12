export class UserController {
  private user: any;

  constructor(public name: string) {
    this.user = this.getUser(name);
  }

  getUser(name: string): any {
    return this.user;
  }
}
