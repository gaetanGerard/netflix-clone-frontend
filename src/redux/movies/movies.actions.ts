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
        payload: data.getMovie
    })
}

export const get_movie_credit = (data) => {
    return ({
        type: MoviesActionTypes.GET_MOVIE_CREDIT,
        payload: data.getCredits
    })
}

export const get_similar_movies = (data) => {
    return ({
        type: MoviesActionTypes.MORE_LIKE_THIS_MOVIE,
        payload: data.getUpcomTopRatedPopuNowPlaying
    })
}

export const reset_movie_store = () => {
    return ({
        type: MoviesActionTypes.RESET_MOVIE_STORE
    })
}