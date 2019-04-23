import _ from "lodash";

import { FETCH_DOCUMENTS } from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_DOCUMENTS:
      return _.keyBy(action.payload, "id");
    default:
      return state;
  }
};
