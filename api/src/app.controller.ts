import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { User } from './users/schemas/users.schema';
import CreateUserDto from './users/dto/create-user.dto';
import { UpdateUserDto } from './users/dto/update-user.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UsersService,
  ) {}

  @Get('/users')
  async users(): Promise<User[]> {
    return this.userService.users();
  }

  @Get('/user/:email')
  async user(@Param('email') email: string): Promise<User> {
    return this.userService.user(email);
  }

  @Post('/user')
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.create(user);
  }

  @Put('/user/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() user: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, user);
  }

  @Delete('/user/:id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return this.userService.delete(id);
  }
}
