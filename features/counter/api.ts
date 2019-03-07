import {get} from 'features/api/api';
import {SwApiSkywalkersResponse} from './models';

export const getSkywalkersFromSwapi = (): Promise<SwApiSkywalkersResponse> =>
    get<SwApiSkywalkersResponse>(
        'https://swapi.co/api/people/?search=Skywalker&format=json',
    );
