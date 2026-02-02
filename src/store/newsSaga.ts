import { call, put, takeEvery } from "redux-saga/effects";

function fakeApi() {
  return Promise.resolve([
    { id: 1, title: "Saga News A" },
    { id: 2, title: "Saga News B" },
  ]);
}

function* fetchNewsSaga(): any {
  const data = yield call(fakeApi);
  yield put({ type: "NEWS_SUCCESS", payload: data });
}

export function* newsWatcher() {
  yield takeEvery("NEWS_REQUEST", fetchNewsSaga);
}
