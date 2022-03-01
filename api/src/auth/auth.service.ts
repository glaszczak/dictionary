import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import CreateUserDto from '../users/dto/create-user.dto';
import { UserDetails } from '../users/user-details.interface';
import AuthCredenialsDto from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async register(user: Readonly<CreateUserDto>): Promise<UserDetails> {
    const { fullName, email, password } = user;

    const existingUser = await this.usersService.findByEmail(email);

    if (existingUser)
      throw new NotFoundException(`User with email ${email} already exist`);

    const hashedPassword = await this.hashPassword(password);

    const newUser = await this.usersService.create({
      fullName,
      email,
      password: hashedPassword,
    });

    return this.usersService.getUserDetails(newUser);
  }

  async login(
    authCredentials: AuthCredenialsDto,
  ): Promise<{ token: string } | null> {
    const { email, password } = authCredentials;
    const user = await this.validateUser(email, password);

    if (!user)
      throw new NotFoundException(`User with email ${email} not exist`);

    const jwt = await this.jwtService.signAsync({ user });

    return { token: jwt };
  }

  async matchPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async validateUser(email: string, password: string): Promise<UserDetails> {
    const user = await this.usersService.findByEmail(email);

    if (!user)
      throw new NotFoundException(`User with email ${email} not exist`);

    const isPasswordMatched = await this.matchPassword(password, user.password);

    if (!isPasswordMatched)
      throw new NotFoundException(`Password is not matched`);

    return this.usersService.getUserDetails(user);
  }
}
