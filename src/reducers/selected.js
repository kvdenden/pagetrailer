import {
  SELECT_DOCUMENT,
  CREATE_DOCUMENT,
  DELETE_DOCUMENT
} from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case SELECT_DOCUMENT: {
      return action.payload;
    }
    case CREATE_DOCUMENT: {
      return action.payload.key;
    }
    case DELETE_DOCUMENT: {
      if (state === action.payload) {
        return null;
      } else {
        return state;
      }
    }
    default: {
      return state;
    }
  }
};
