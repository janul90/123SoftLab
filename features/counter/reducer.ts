import { getType } from 'typesafe-actions';
import { RootAction } from '../redux';
import { decrementCounter, fetchCounterRequest, incrementCounter, killSkywalker } from './actions';
import { SwApiSkywalkersResponse } from './models';

const emptySkywalkersTable: SwApiSkywalkersResponse = {
  count: 0,
  results: [],
};

export type CounterState = {
  readonly skywalkers: SwApiSkywalkersResponse;
  readonly count: number;
  readonly isFetching: boolean;
};

export const initialState: CounterState = {
  skywalkers: emptySkywalkersTable,
  count: 0,
  isFetching: false,
};

export default function (state: CounterState = initialState, action: RootAction): CounterState {
  switch (action.type) {
    case (getType(fetchCounterRequest.request)):
      return {
        ...state,
        isFetching: true,
      };
    case (getType(fetchCounterRequest.success)):
      return {
        ...state,
        skywalkers: action.payload,
        count: 0,
        isFetching: false,
      };
    case (getType(fetchCounterRequest.failure)):
      return {
        ...state,
        isFetching: false,
      };
    case (getType(incrementCounter)):
      return {
        ...state,
        count: state.count + 1,
      };
    case (getType(decrementCounter)):
      return {
        ...state,
        count: state.count - 1,
      };
    case (getType(killSkywalker)):
      return {
        ...state,
        skywalkers: removeSkywalker(state.skywalkers, action.payload),
      };
    default: {
      return state;
    }
  }
}

function removeSkywalker(skywalkers: SwApiSkywalkersResponse, index: number): SwApiSkywalkersResponse {
  skywalkers.results.splice(index, 1);
  return skywalkers;
}
