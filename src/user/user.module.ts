// user.module.ts
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './repository/user.repository';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([UserRepository])],
  controllers: [],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
