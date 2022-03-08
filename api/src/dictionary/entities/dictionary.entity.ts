import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WordEntity } from '../../word/entities/word.entity';

@Entity({ name: 'dictionary' })
export class DictionaryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  userId: string;

  @ManyToOne(() => WordEntity, (word: WordEntity) => word.dictionaries)
  word: WordEntity;
}
