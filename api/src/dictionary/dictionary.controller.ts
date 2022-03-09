import { WordService } from './../word/word.service';
import { DictionaryEntity } from './entities/dictionary.entity';
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { DictionaryService } from './dictionary.service';
import { UserObject } from '../user/decorators/user-object.decorator';
import { UserDocument } from '../user/schemas/user.schema';
import { DictionaryResponse } from './interfaces/dictionary-response.interface';

@Controller('dictionary')
export class DictionaryController {
  constructor(
    private readonly dictionaryService: DictionaryService,
    private readonly wordService: WordService,
  ) {}

  @UseGuards(JwtGuard)
  @Post('word')
  async createDictionary(
    @UserObject() user: UserDocument,
    @Body() { word }: { word: string },
  ): Promise<DictionaryEntity> {
    const wordObj = await this.wordService.word(word);

    return this.dictionaryService.createDictionary({
      userId: user._id,
      wordId: wordObj.id,
    });
  }

  @Get()
  @UseGuards(JwtGuard)
  async userDictionary(
    @UserObject() user: UserDocument,
  ): Promise<DictionaryResponse> {
    const dictionaries = await this.dictionaryService.dictionaries(user._id);

    return { user, dictionaries };
  }
}
