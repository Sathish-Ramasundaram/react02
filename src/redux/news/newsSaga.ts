import { call, put, takeLatest } from "redux-saga/effects";
import { fetchNewsApi } from "../../api/newsApi";
import {
  fetchNewsSuccess,
  fetchNewsFailure,
} from "./newsActions";
import { FETCH_NEWS_REQUEST } from "./newsTypes";

function* fetchNewsWorker(): any {
  try {
    const data = yield call(fetchNewsApi);
    yield put(fetchNewsSuccess(data));
  } catch (err: any) {
    yield put(fetchNewsFailure(err.message));
  }
}

export function* newsSaga() {
  console.log("STEP2: Saga watcher started");

  yield takeLatest(FETCH_NEWS_REQUEST, fetchNewsWorker);
}