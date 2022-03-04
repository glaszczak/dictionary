import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import CreateUserDto from '../users/dto/create-user.dto';
import AuthCredenialsDto from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../users/schemas/users.schema';
import { Role } from '../users/role.enum';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private readonly admin = {
    fullName: process.env.ADMIN_USERNAME,
    email: `${process.env.ADMIN_USERNAME}@example.com`,
    password: process.env.ADMIN_PASSWORD,
    role: Role.ADMIN,
  };

  async onModuleInit() {
    const user = await this.usersService.findByEmail(this.admin.email);

    if (!user) {
      await this.register(this.admin);
    }
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async register(user: Readonly<CreateUserDto>): Promise<UserDocument> {
    const { fullName, email, password, role } = user;

    const existingUser = await this.usersService.findByEmail(email);

    if (existingUser)
      throw new NotFoundException(`User with email ${email} already exist`);

    const hashedPassword = await this.hashPassword(password);

    return this.usersService.create({
      fullName,
      email,
      password: hashedPassword,
      role
    });
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

  async validateUser(email: string, password: string): Promise<UserDocument> {
    const user = await this.usersService.findByEmail(email);

    if (!user)
      throw new NotFoundException(`User with email ${email} not exist`);

    const isPasswordMatched = await this.matchPassword(password, user.password);

    if (!isPasswordMatched)
      throw new NotFoundException(`Password is not matched`);

    return user;
  }
}
