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

  readonly JWT_ACCESS_TOKEN_EXPIRATION_TIME = 1 * 60 * 60;

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

  async getCookieWithJwtAccessToken(user: User) {
    const payload = { email: user.email };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET_ACCESS'),
      expiresIn: this.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    });

    return {
      accessToken,
      httpOnly: true,
      maxAge: this.JWT_ACCESS_TOKEN_EXPIRATION_TIME * 1000,
    };
  }
}
