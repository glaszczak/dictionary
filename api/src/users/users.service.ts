import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/users.schema';
import CreateUserDto from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  private readonly fakeUsers = [
    {
      fullName: 'Example User',
      email: 'example@email.com',
      password: 'example',
    },
    {
      fullName: 'John User',
      email: 'john@email.com',
      password: 'john',
    },
  ];

  async addFakeUsers(): Promise<UserDocument[]> {
    const users = this.fakeUsers.map(async (user) => {
      const createdUser = new this.userModel(user);
      return createdUser.save();
    });

    return Promise.all(users);
  }

  async users(): Promise<UserDocument[]> {
    const users = await this.userModel.find();

    if (users.length === 0) {
      await this.addFakeUsers();
    }

    const updatedUsers = await this.userModel.find();

    return updatedUsers;
  }

  async user(email: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email });

    if (!user) throw new NotFoundException(`User ${email} not found`);

    return user;
  }

  async create(user: CreateUserDto): Promise<UserDocument> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async update(id: string, userInput: UpdateUserDto): Promise<User | null> {
    try {
      const user = await this.userModel.findOne({ _id: id });

      if (!user) throw new NotFoundException(`User #${id} not found`);

      user.fullName = userInput.fullName ?? user.fullName;
      user.email = userInput.email ?? user.email;
      user.password = userInput.password ?? user.password;
      user.updatedAt = new Date();

      return user.save();
    } catch (error) {
      console.log({ error });
    }
  }

  async delete(id: string): Promise<User | null> {
    try {
      const user = await this.userModel.findOne({ _id: id });

      if (!user) throw new NotFoundException(`User #${id} not found`);

      return user.deleteOne({ _id: id });
    } catch (error) {
      console.log({ error });
    }
  }
}
