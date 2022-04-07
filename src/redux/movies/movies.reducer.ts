import { MoviesActionTypes } from './movies.types';
import { DISCOVER } from '../../types/discoverTypes';

type INITIAL_STATE_TYPE = {
    discoverMovies: DISCOVER | null,
}

const INITIAL_STATE: INITIAL_STATE_TYPE = {
    discoverMovies: null,
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
        default:
            return state;
    }
}

export default moviesReducer