import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DictionaryEntity } from './entities/dictionary.entity';
import { WordEntity } from '../word/entities/word.entity';
import { CreateDictionaryDto } from './dto/create-dictionary.dto';

@Injectable()
export class DictionaryService {
  constructor(
    @InjectRepository(DictionaryEntity)
    private dictionaryRepository: Repository<DictionaryEntity>,
    @InjectRepository(WordEntity)
    private wordRepository: Repository<WordEntity>,
  ) {}

  async createDictionary({
    userId,
    wordId,
  }: CreateDictionaryDto): Promise<DictionaryEntity> {
    const word = await this.wordRepository.findOne({
      id: wordId,
    });

    const dictionary = await this.dictionaryRepository.create({
      userId,
      word,
    });

    const hasUserWord = await this.hasUserWord(userId, wordId);

    if (hasUserWord)
      throw new HttpException(
        `User already has word '${word.word}' in the dictionary`,
        400,
      );

    return this.dictionaryRepository.save(dictionary);
  }

  async dictionaries(userId: string): Promise<DictionaryEntity[]> {
    return this.dictionaryRepository.find({ userId });
  }

  async findOne(id: string) {
    const dictionary = await this.dictionaryRepository.findOne(id);
    if (!dictionary)
      throw new HttpException('Dictionary not found', HttpStatus.NOT_FOUND);

    return dictionary;
  }

  async hasUserWord(userId: string, wordId: string): Promise<boolean> {
    const dictionary = await this.dictionaryRepository.find({
      where: {
        userId,
        word: {
          id: wordId,
        },
      },
      relations: ['word'],
    });

    if (dictionary.length) return true;

    return false;
  }
}
