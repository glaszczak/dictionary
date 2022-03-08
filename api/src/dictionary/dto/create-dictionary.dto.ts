import { IsNotEmpty, IsString } from 'class-validator';
import { WordEntity } from '../../word/entities/word.entity';

export class CreateDictionaryDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  wordId: string;
}
