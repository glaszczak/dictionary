import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { WordModule } from './word/word.module';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule, WordModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
