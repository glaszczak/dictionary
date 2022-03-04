import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { User } from './users/schemas/users.schema';
import { UpdateUserDto } from './users/dto/update-user.dto';
import { Roles } from './auth/decorators/roles.decorator';
import { JwtGuard } from './auth/guards/jwt.guard';
import { Role } from './users/role.enum';
import { RolesGuard } from './auth/guards/roles.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UsersService,
  ) {}

  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Get('/users')
  async users(): Promise<User[]> {
    return this.userService.users();
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard)
  @Get('/user/:email')
  async user(@Param('email') email: string): Promise<User> {
    return this.userService.user(email);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard)
  @Put('/user/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() user: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, user);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard)
  @Delete('/user/:id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return this.userService.delete(id);
  }
}
