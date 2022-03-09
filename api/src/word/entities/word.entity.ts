import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MeaningInterface } from '../interfaces/meaning.interface';
import { DictionaryEntity } from '../../dictionary/entities/dictionary.entity';

@Entity({ name: 'word' })
export class WordEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  word: string;
  
  @Column({ nullable: true })
  audioUrl?: string;

  @Column({ type: 'jsonb', nullable: true })
  meanings?: MeaningInterface[];

  @OneToMany(
    () => DictionaryEntity,
    (dictionary: DictionaryEntity) => dictionary.word,
  )
  dictionaries: DictionaryEntity[];
}
