import {all, call, put, select, takeEvery} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';
import {fetchCounter, fetchCounterRequest} from './actions';
import * as api from './api';
import {SwApiSkywalkersResponse} from './models';
import {isFetching} from './selectors';

export function* handleFetchCounter() {
    try {
        const state = yield select();
        if (isFetching(state)) {
            return;
        }
        yield put(fetchCounterRequest.request());
        const swapiResponse: SwApiSkywalkersResponse = yield call(api.getSkywalkersFromSwapi);
        yield put(fetchCounterRequest.success(swapiResponse));
    } catch (err) {
        console.log(err);
        yield put(fetchCounterRequest.failure(err));
    }
}

export default function* () {
    yield all([
        takeEvery(getType(fetchCounter), handleFetchCounter),
    ]);
}