export interface MeaningInterface {
  partOfSpeech: string;
  definitions: Definition[];
}

interface Definition {
  definition: string;
  example?: string;
}
