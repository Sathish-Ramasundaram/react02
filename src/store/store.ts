import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import newsReducer from "./newsReducer";
import { newsWatcher } from "./newsSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  newsReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(newsWatcher);
