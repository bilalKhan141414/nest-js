import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserCredentialsDto } from 'src/dtos/user-credentials.dto';

@Injectable({})
export class AuthService {
  constructor(private jwtService: JwtService) {}
  login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  signup(userCredsDto: UserCredentialsDto): UserCredentialsDto {
    //
    return userCredsDto;
  }
}
