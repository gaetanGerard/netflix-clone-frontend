import { SeriesActionTypes } from './series.types';
import { DISCOVER } from '../../types/discoverTypes';
import { SERIES } from '../../types/seriesTypes';

type INITIAL_STATE_TYPE = {
    discoverSeries: DISCOVER | null,
    series: SERIES | null,
}

const INITIAL_STATE: INITIAL_STATE_TYPE = {
    discoverSeries: null,
    series: null,
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
        case SeriesActionTypes.GET_TV:
            return {
                ...state,
                series: action.payload
            }
        case SeriesActionTypes.RESET_TV_STORE:
            return {
                ...state,
                discoverSeries: null,
                series: null,
            }
        default:
            return state;
    }
}

export default seriesReducer