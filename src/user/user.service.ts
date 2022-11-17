import { User } from './entity/user.entity';
import { UserRepository } from './repository/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { hash, isHashValid } from 'src/util/encrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}
  async findById(id: number): Promise<User> {
    return this.userRepository.findById(id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findByEmail(email);
  }

  async setRefreshToken(refreshToken: string, id: number) {
    await this.userRepository.update(id, {
      refreshToken: await hash(refreshToken),
    });
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, id: number) {
    const user = await this.findById(id);

    if (await isHashValid(refreshToken, user.refreshToken)) {
      return user;
    }
  }

  async removeRefreshToken(id: number) {
    return this.userRepository.update(id, { refreshToken: null });
  }
}
