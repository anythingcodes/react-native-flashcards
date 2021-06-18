import { ADD_DECK, RECEIVE_DECKS } from "../actions";

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
      default:
        return state;
    }
}
