import { Injectable } from '@nestjs/common';
import { UserCredentialsDto } from 'src/dtos/user-credentials.dto';
import { encodePassword } from 'src/utils/bcrypt.util';
import { UserRepository } from './user.repository';
import { UserLoginCredentialsDto } from '../dtos/user-login-credentials.dto';
import { verifyPassword } from '../utils/bcrypt.util';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(userCredentials: UserCredentialsDto): Promise<void> {
    const password = encodePassword(userCredentials.password);
    await this.userRepository.CreateUser({ ...userCredentials, password });
  }

  async validateUser({ email, password }: UserLoginCredentialsDto) {
    const user = await this.userRepository.findOneBy({ email });
    const isValid = user && verifyPassword(password, user.password);
    if (isValid) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }
}
