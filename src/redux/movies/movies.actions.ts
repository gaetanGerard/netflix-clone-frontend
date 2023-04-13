/* eslint-disable react-hooks/rules-of-hooks */
import { MoviesActionTypes } from './movies.types';

export const discover_movies = (data) => {
    return ({
        type: MoviesActionTypes.DISCOVER_MOVIES,
        payload: data.getDiscover
    })
}

export const get_movie = (data) => {
    return ({
        type: MoviesActionTypes.GET_MOVIE,
        payload: data !== null ? data.getMovie : null
    })
}

export const get_movie_credit = (data) => {
    return ({
        type: MoviesActionTypes.GET_MOVIE_CREDIT,
        payload: data.getMovieCredit
    })
}

export const reset_movie_store = () => {
    return ({
        type: MoviesActionTypes.RESET_MOVIE_STORE
    })
}