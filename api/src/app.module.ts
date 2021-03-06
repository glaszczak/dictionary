import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { DictionaryModule } from './dictionary/dictionary.module';
import { WordModule } from './word/word.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule, WordModule, DictionaryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
