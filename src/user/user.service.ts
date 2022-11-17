import { User } from './entity/user.entity';
import { UserRepository } from './repository/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findByEmail(email);
  }
}
