import { combineReducers } from "redux";
import newsReducer from "./news/newsReducer";

const rootReducer = combineReducers({
  news: newsReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;