import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { UserService } from 'src/user/user.service';
import { JwtRefreshGuard } from './guard/jwt-refresh.guard';
import { AuthUserDto } from 'src/user/dto/auth-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() _loginInput: LoginInput,
    @Request() req: Request | any,
  ): Promise<any> {
    const validatedUser: AuthUserDto = req.user;

    const { accessToken, accessOption } =
      await this.authService.getCookieWithJwtAccessToken(validatedUser);

    const { refreshToken, refreshOption } =
      await this.authService.getCookieWithJwtRefreshToken(validatedUser);

    await this.userService.setRefreshToken(refreshToken, validatedUser.id);

    req.res.cookie('ACCESS_TOKEN', accessToken, accessOption);
    req.res.cookie('REFRESH_TOKEN', refreshToken, refreshOption);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async refresh(@Request() req: Request | any) {
    const validatedUser: AuthUserDto = req.user;

    const { accessToken, accessOption } =
      await this.authService.getCookieWithJwtAccessToken(validatedUser);

    req.res.cookie('ACCESS_TOKEN', accessToken, accessOption);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('logout')
  async logOut(@Request() req: Request | any) {
    const validatedUser: AuthUserDto = req.user;

    const { accessToken, accessOption, refreshToken, refreshOption } =
      await this.authService.getCookiesForLogOut();

    await this.userService.removeRefreshToken(validatedUser.id);

    req.res.cookie('ACCESS_TOKEN', accessToken, accessOption);
    req.res.cookie('REFRESH_TOKEN', refreshToken, refreshOption);
  }
}
