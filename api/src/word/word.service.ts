import { Definition, MeaningInterface } from './interfaces/meaning.interface';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WordEntity } from './entities/word.entity';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WordService {
  constructor(
    @InjectRepository(WordEntity)
    private wordRepository: Repository<WordEntity>,
    private httpService: HttpService,
  ) {}

  async word(word: string): Promise<WordEntity> {
    const foundWord = await this.wordRepository.findOne({
      where: {
        word,
      },
    });

    let wordId: string;

    if (!foundWord) {
      const newWord = await this.addWord(word);
      wordId = newWord.id;
    } else {
      wordId = foundWord.id;
    }

    return this.wordRepository.findOne(wordId);
  }

  async addWord(word: string): Promise<WordEntity> {
    const { data: foundWord } = await firstValueFrom(
      this.httpService.get(`${process.env.DICTIONARY_API_URL}/${word}`),
    );

    let meanings: MeaningInterface[] = [];
    let definitions: Definition[] = [];

    foundWord.forEach((word) => {
      word.meanings.forEach((meaning) => {
        meaning.definitions.forEach((definition) => {
          definitions.push({
            definition: definition.definition,
          });
        });
        meanings.push({
          partOfSpeech: meaning.partOfSpeech,
          definitions,
        });
      });
    });

    const newWord = await this.wordRepository.create({
      word,
      audioUrl: foundWord[0].phonetics[0].audio,
      meanings,
    });
    
    return this.wordRepository.save(newWord);
  }
}
