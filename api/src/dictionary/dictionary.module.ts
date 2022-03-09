import { WordService } from './../word/word.service';
import { Module } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { DictionaryController } from './dictionary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordEntity } from '../word/entities/word.entity';
import { DictionaryEntity } from './entities/dictionary.entity';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forFeature([WordEntity, DictionaryEntity]),
    HttpModule,
  ],
  controllers: [DictionaryController],
  providers: [DictionaryService, WordService],
})
export class DictionaryModule {}
