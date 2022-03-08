import { DictionaryEntity } from './entities/dictionary.entity';
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { DictionaryService } from './dictionary.service';
import { UserObject } from '../users/decorators/user-object.decorator';
import { UserDocument } from '../users/schemas/users.schema';

@Controller('dictionary')
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @UseGuards(JwtGuard)
  @Post()
  async createDictionary(
    @UserObject() user: UserDocument,
    @Body() { wordId }: { wordId: string },
  ) {
    return this.dictionaryService.createDictionary({
      userId: user._id,
      wordId,
    });
  }

  @Get()
  @UseGuards(JwtGuard)
  async userDictionary(
    @UserObject() user: UserDocument,
  ): Promise<DictionaryEntity[]> {
    return this.dictionaryService.dictionaries(user._id);
  }
}
