import { IsNotEmpty, IsString } from 'class-validator';

export class AuthCredenialsDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export default AuthCredenialsDto;
