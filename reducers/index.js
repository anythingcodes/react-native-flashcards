import { ADD_CARD, ADD_DECK, RECEIVE_DECKS } from "../actions";

export default function cards(state = {}, action) {
    switch (action.type) {
      case RECEIVE_DECKS:
        return {
          ...state,
          ...action.decks
        }
      case ADD_DECK:
        return {
          ...state,
          ...action.deck
        }
      case ADD_CARD:
        const { card, key: cardKey } = action;
        const addedQuestions = state[cardKey].questions;
        addedQuestions.push(card);
        return {
          ...state,
          [cardKey]: {
            title: cardKey,
            questions: addedQuestions
          }
        }
      default:
        return state;
    }
}
