import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { CustomRepository } from 'src/database/typeorm-ex.decorator';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async findById(id: number): Promise<User> {
    return this.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User> {
    return this.findOneBy({ email });
  }
}
