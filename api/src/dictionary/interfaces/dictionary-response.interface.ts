import { UserDocument } from '../../user/schemas/user.schema';
import { DictionaryEntity } from '../entities/dictionary.entity';

export interface DictionaryResponse {
  user: UserDocument;
  dictionaries: DictionaryEntity[];
}
