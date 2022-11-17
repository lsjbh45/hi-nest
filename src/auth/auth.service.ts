import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entity/User.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (user !== undefined && user.password === password) {
      const { password, ...result } = user;
      if (password) {
        return result;
      }
    }

    return null;
  }

  async login(user: User) {
    return this.jwtService.sign({
      email: user.email,
    });
  }
}
