import { combineReducers } from "redux";

import documents from "./documents";
import selected from "./selected";
import history from "./history";

export default combineReducers({
  documents,
  selected,
  history
});
