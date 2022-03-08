import { IsNotEmpty, IsString } from "class-validator";
import { MeaningInterface } from "../interfaces/meaning.interface";

export class CreateWordDto {
  @IsString()
  word: string;
  
  @IsString()
  audioUrl?: string;

  meanings?: MeaningInterface;
}