import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWordDto } from './dto/create-word.dto';
import { WordEntity } from './entities/word.entity';

@Injectable()
export class WordService {
  constructor(
    @InjectRepository(WordEntity)
    private wordRepository: Repository<WordEntity>,
  ) {}

  async create(createWordDto: CreateWordDto) {
    const newWord = await this.wordRepository.create(createWordDto);
    return this.wordRepository.save(newWord);
  }
}
