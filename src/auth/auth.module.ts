import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtRefreshStrategy } from './strategy/jwt-refresh.strategy';

@Module({
  imports: [UserModule, PassportModule, ConfigModule, JwtModule],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
  exports: [AuthService, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
