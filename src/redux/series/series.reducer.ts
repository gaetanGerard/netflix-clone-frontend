import { SeriesActionTypes } from './series.types';
import { DISCOVER } from '../../types/discoverTypes';

type INITIAL_STATE_TYPE = {
    discoverSeries: DISCOVER | null,
}

const INITIAL_STATE: INITIAL_STATE_TYPE = {
    discoverSeries: null,
}

const seriesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SeriesActionTypes.DISCOVER_SERIES:
            const { page, results, total_pages, total_results } = action.payload;
            return {
                ...state,
                discoverSeries: {
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

export default seriesReducer