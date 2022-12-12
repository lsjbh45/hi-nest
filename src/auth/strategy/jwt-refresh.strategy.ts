import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { AuthUserDto } from '../../user/dto/auth-user.dto';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    private readonly userService: UserService,
    private readonly config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request | any) => {
          return request?.cookies?.REFRESH_TOKEN;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET_REFRESH'),
      passReqToCallback: true,
    });
  }

  async validate(request: Request | any, payload: any): Promise<AuthUserDto> {
    const refreshToken = request?.cookies?.REFRESH_TOKEN;
    return this.userService.getUserIfRefreshTokenMatches(
      refreshToken,
      payload.id,
    );
  }
}
