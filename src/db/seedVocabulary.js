import { vocabularyBank } from '../data/vocabulary'
import { ensureVocabularySeed } from './database'

export const seedVocabulary = async () => {
  await ensureVocabularySeed(vocabularyBank)
  return vocabularyBank
}
