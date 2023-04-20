import { MoviesActionTypes } from './movies.types';
import { DISCOVER } from '../../types/discoverTypes';
import { MOVIE, MOVIE_CREDIT, MORELIKETHISMOVIE } from '../../types/moviesTypes';

type INITIAL_STATE_TYPE = {
    discoverMovies: DISCOVER | null,
    movie: MOVIE | null,
    movieCast: MOVIE_CREDIT | null,
    moreLikeThisMovie: MORELIKETHISMOVIE | null
}

const INITIAL_STATE: INITIAL_STATE_TYPE = {
    discoverMovies: null,
    movie: null,
    movieCast: null,
    moreLikeThisMovie: null
}

const moviesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MoviesActionTypes.DISCOVER_MOVIES:
            const { page, results, total_pages, total_results } = action.payload;
            return {
                ...state,
                discoverMovies: {
                    page,
                    results,
                    total_pages,
                    total_results
                }
            }
        case MoviesActionTypes.GET_MOVIE:
            return {
                ...state,
                movie: action.payload
            }
        case MoviesActionTypes.GET_MOVIE_CREDIT:
            return {
                ...state,
                movieCast: action.payload
            }
        case MoviesActionTypes.MORE_LIKE_THIS_MOVIE:
            return {
                ...state,
                moreLikeThisMovie: action.payload
            }
        case MoviesActionTypes.RESET_MOVIE_STORE:
            return {
                ...state,
                discoverMovies: null,
                movie: null,
                movieCast: null,
                moreLikeThisMovie: null
            }
        default:
            return state;
    }
}

export default moviesReducer