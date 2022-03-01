import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import CreateUserDto from '../users/dto/create-user.dto';
import { UserDetails } from '../users/user-details.interface';
import { AuthService } from './auth.service';
import AuthCredenialsDto from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() user: CreateUserDto): Promise<UserDetails> {
    return this.authService.register(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() user: AuthCredenialsDto): Promise<{ token: string } | null> {
    return this.authService.login(user);
  }
}