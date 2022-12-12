import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDto } from 'src/user/dto/auth-user.dto';
import { UserService } from 'src/user/user.service';
import { isHashValid } from 'src/util/encrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  readonly JWT_ACCESS_TOKEN_EXPIRATION_TIME = 1 * 60 * 60;
  readonly JWT_REFRESH_TOKEN_EXPIRATION_TIME = 30 * 24 * 60 * 60;

  async validateUser(email: string, password: string): Promise<AuthUserDto> {
    const user = await this.userService.findByEmail(email);

    if (user && (await isHashValid(password, user.password))) {
      return user.toAuthUserDto();
    }
    return null;
  }

  async getCookieWithJwtAccessToken(payload: AuthUserDto) {
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET_ACCESS'),
      expiresIn: this.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    });

    return {
      accessToken,
      accessOption: {
        httpOnly: true,
        maxAge: this.JWT_ACCESS_TOKEN_EXPIRATION_TIME * 1000,
      },
    };
  }

  async getCookieWithJwtRefreshToken(payload: AuthUserDto) {
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET_REFRESH'),
      expiresIn: this.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    });

    return {
      refreshToken,
      refreshOption: {
        httpOnly: true,
        maxAge: this.JWT_REFRESH_TOKEN_EXPIRATION_TIME * 1000,
      },
    };
  }

  async getCookiesForLogOut() {
    return {
      accessToken: '',
      accessOption: {
        httpOnly: true,
        maxAge: 0,
      },
      refreshToken: '',
      refreshOption: {
        httpOnly: true,
        maxAge: 0,
      },
    };
  }
}
