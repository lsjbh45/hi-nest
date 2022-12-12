import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { User } from './util/user.decorator';

@Controller('')
export class AppController {
  @UseGuards(JwtAuthGuard)
  @Get()
  home(@User() user) {
    return user;
  }
}
