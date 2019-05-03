import _ from "lodash";

import {
  FETCH_DOCUMENTS,
  CREATE_DOCUMENT,
  DELETE_DOCUMENT
} from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_DOCUMENTS:
      return _.keyBy(action.payload, "key");
    case CREATE_DOCUMENT:
      const { key } = action.payload;
      return { [key]: action.payload, ...state };
    case DELETE_DOCUMENT:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
