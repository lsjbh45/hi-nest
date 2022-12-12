import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AuthUserDto } from '../dto/auth-user.dto';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  @Exclude()
  refreshToken?: string;

  toAuthUserDto(): AuthUserDto {
    return {
      id: this.id,
      email: this.email,
    };
  }
}
