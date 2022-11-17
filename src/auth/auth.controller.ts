import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() _loginInput: LoginInput,
    @Request() req: Request | any,
  ): Promise<any> {
    const { accessToken, ...accessOption } =
      await this.authService.getCookieWithJwtAccessToken(req.user);
    req.res.cookie('ACCESS_TOKEN', accessToken, accessOption);
  }
}
