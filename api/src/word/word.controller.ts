import { Body, Controller, Post } from '@nestjs/common';
import { CreateWordDto } from './dto/create-word.dto';
import { WordService } from './word.service';

@Controller('word')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Post()
  async createWord(@Body() createWordDto: CreateWordDto) {
    return this.wordService.create(createWordDto);
  }
}
