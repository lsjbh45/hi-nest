import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request | any) => {
          return request?.cookies?.ACCESS_TOKEN;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET_ACCESS'),
    });
  }

  async validate(payload: any) {
    return { id: payload.id, email: payload.email };
  }
}
