import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';

@Controller('')
export class AppController {
  @UseGuards(JwtAuthGuard)
  @Get()
  home() {
    return 'Welcome to my Movie API';
  }
}
