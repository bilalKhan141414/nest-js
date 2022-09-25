import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Public } from 'src/decorators/public-routs.decorator';
import { UserCredentialsDto } from 'src/dtos/user-credentials.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Public()
  @Post('/signup')
  async SignUp(@Body() userCredsDto: UserCredentialsDto): Promise<void> {
    return this.userService.create(userCredsDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  LogIn(@Request() request) {
    return this.authService.login(request.user);
  }

  @Get('/profile')
  Profile(): string {
    return 'Bilal Khan';
  }
}
