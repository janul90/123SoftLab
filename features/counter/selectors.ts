import {RootState} from '../redux';
import {SwApiSkywalkersResponse} from './models';

export function getCount(state: RootState): number {
    return state.counter.count;
}

export function getSkywalkers(state: RootState): SwApiSkywalkersResponse {
    return state.counter.skywalkers;
}

export function isFetching(state: RootState): boolean {
    return state.counter.isFetching;
}
