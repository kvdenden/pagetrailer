import { FETCH_DOCUMENT_HISTORY } from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_DOCUMENT_HISTORY: {
      const { key, history } = action.payload;
      return { ...state, [key]: history };
    }
    default: {
      return state;
    }
  }
};
