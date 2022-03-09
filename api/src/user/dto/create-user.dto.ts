import { IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  role?: Role;
}

export default CreateUserDto;
