import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchNewsApi } from '../../api/newsApi';
import { fetchNewsSuccess, fetchNewsFailure } from './newsActions';
import { FETCH_NEWS_REQUEST } from './newsTypes';

function* fetchNewsWorker(): any {
  console.log('STEP3: Saga worker started');
  try {
    console.log('STEP4: Before API call');

    const data = yield call(fetchNewsApi);

    console.log('STEP5: After API call', data);

    console.log("STEP6: Saga dispatching SUCCESS action");

    yield put(fetchNewsSuccess(data));
  } catch (err: any) {
    yield put(fetchNewsFailure(err.message));
  }
}

export function* newsSaga() {
  console.log('STEP2: Saga watcher started');

  yield takeLatest(FETCH_NEWS_REQUEST, fetchNewsWorker);
}
