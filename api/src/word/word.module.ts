import { DictionaryService } from './../dictionary/dictionary.service';
import { WordEntity } from './entities/word.entity';
import { Module } from '@nestjs/common';
import * as Joi from '@hapi/joi';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordController } from './word.controller';
import { WordService } from './word.service';
import { ConfigModule } from '@nestjs/config';
import { DictionaryEntity } from '../dictionary/entities/dictionary.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DICTIONARY_API_URL: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forFeature([WordEntity, DictionaryEntity]),
    HttpModule,
  ],
  controllers: [WordController],
  providers: [WordService, DictionaryService],
})
export class WordModule {}
