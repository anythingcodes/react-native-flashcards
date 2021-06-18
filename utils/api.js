import { AsyncStorage } from 'react-native';
import { FLASHCARD_STORAGE_KEY, formatFlashcards } from './_results';

export const fetchFlashcards = () => {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY).then(formatFlashcards)
};

export const submitCard = ({ card, key }) => {
  return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
    [key]: card
  }))
};

export const removeCard = (key) => {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then(results => {
      const data = JSON.parse(results);
      data[key] = undefined;
      delete data[key];
      AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(data))
    })
};
