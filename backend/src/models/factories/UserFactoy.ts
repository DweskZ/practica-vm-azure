import { User } from "../User";

export class UserFactory {
  static create(email: string, hashedPassword: string): User {
    const user = new User();
    user.email = email;
    user.password = hashedPassword;
    return user;
  }
}
