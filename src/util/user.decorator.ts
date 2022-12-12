import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUserDto } from 'src/user/dto/auth-user.dto';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext): AuthUserDto => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
