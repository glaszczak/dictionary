import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDictionaryDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  wordId: string;
}
