import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entity/User.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (user && user.password === password) {
      const { password, ...result } = user;
      if (password) {
        return result;
      }
    }

    return null;
  }

  async getJwtAccessToken(user: User) {
    const payload = { email: user.email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET_ACCESS'),
      expiresIn: `1h`,
    });

    return token;
  }
}
