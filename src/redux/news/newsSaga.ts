import { call, put, race, delay, throttle, select } from "redux-saga/effects";
import { fetchNewsApi } from '../../api/newsApi';
import { fetchNewsSuccess, fetchNewsFailure } from './newsActions';
import { FETCH_NEWS_REQUEST } from './newsTypes';

function* fetchNewsWorker(): any {

  try {

     const currentNews = yield select((state: any) => state.news.data);
    console.log("SELECT: news already in store =", currentNews.length);

    console.log("RACE: starting API vs timeout");

const { data, timeout } = yield race({
  data: call(fetchNewsApi),
  timeout: delay(2000),
});

if (timeout) {
  console.log("RACE: timeout won");
  yield put(fetchNewsFailure("Request timed out"));
  return;
}

console.log("RACE: API won");


    yield put(fetchNewsSuccess(data));
  } catch (err: any) {
    yield put(fetchNewsFailure(err.message));
  }
}

export function* newsSaga() {

  yield throttle(3000, FETCH_NEWS_REQUEST, fetchNewsWorker);

}
