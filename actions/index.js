export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';

export const receiveDecks = (decks) => {
  return {
    type: RECEIVE_DECKS,
    decks
  }
};

export const addDeck = (deck) => {
  return {
    type: ADD_DECK,
    deck
  }
};

export const addCard = ({ card, key }) => {
  return {
    type: ADD_CARD,
    card,
    key
  }
};
