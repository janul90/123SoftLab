import { RequestError } from 'features/api/models';
import { createAction, createAsyncAction } from 'typesafe-actions';
import { SwApiSkywalkersResponse } from './models';

export const fetchCounter = createAction(
  'counter/FETCH_COUNTER'
);

export const fetchCounterRequest = createAsyncAction(
  'counter/FETCH_COUNTER_REQUESTED',
  'counter/FETCH_COUNTER_SUCCEEDED',
  'counter/FETCH_COUNTER_FAILED',
)<void, SwApiSkywalkersResponse, RequestError>();

export const incrementCounter = createAction(
  'counter/INCREMENT'
);

export const decrementCounter = createAction(
  'counter/DECREMENT'
);

export const killSkywalker = createAction(
  'counter/KILL',
  (resolve) => (index: number) => resolve(index)
);
