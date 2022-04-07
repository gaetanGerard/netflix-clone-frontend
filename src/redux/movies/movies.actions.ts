/* eslint-disable react-hooks/rules-of-hooks */
import { MoviesActionTypes } from './movies.types';

export const discover_movies = (data) => {
    return ({
        type: MoviesActionTypes.DISCOVER_MOVIES,
        payload: data.getDiscover
    })
}