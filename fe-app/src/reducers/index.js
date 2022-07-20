import { combineReducers } from "redux";

import flights from "./flights";
import airports from "./airports";

export default combineReducers({
  flights,
  airports,
});
