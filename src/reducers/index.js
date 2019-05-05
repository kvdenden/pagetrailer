import { combineReducers } from "redux";

import documents from "./documents";
import selected from "./selected";

export default combineReducers({
  documents,
  selected
});
