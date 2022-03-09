import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import CreateUserDto from '../user/dto/create-user.dto';
import AuthCredenialsDto from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../user/schemas/user.schema';
import { Role } from '../user/role.enum';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  private readonly admin = {
    fullName: process.env.ADMIN_USERNAME,
    email: `${process.env.ADMIN_USERNAME}@example.com`,
    password: process.env.ADMIN_PASSWORD,
    role: Role.ADMIN,
  };

  async onModuleInit() {
    const user = await this.userService.findByEmail(this.admin.email);

    if (!user) {
      await this.register(this.admin);
    }
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async register(user: Readonly<CreateUserDto>): Promise<UserDocument> {
    const { fullName, email, password, role } = user;

    const existingUser = await this.userService.findByEmail(email);

    if (existingUser)
      throw new NotFoundException(`User with email ${email} already exist`);

    const hashedPassword = await this.hashPassword(password);

    return this.userService.create({
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
    const user = await this.userService.findByEmail(email);

    if (!user)
      throw new NotFoundException(`User with email ${email} not exist`);

    const isPasswordMatched = await this.matchPassword(password, user.password);

    if (!isPasswordMatched)
      throw new NotFoundException(`Password is not matched`);

    return user;
  }
}
