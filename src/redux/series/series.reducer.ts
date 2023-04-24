import { SeriesActionTypes } from './series.types';
import { DISCOVER } from '../../types/discoverTypes';
import { SERIES, SEASON, MORELIKETHISTV } from '../../types/seriesTypes';

type INITIAL_STATE_TYPE = {
    discoverSeries: DISCOVER | null,
    series: SERIES | null,
    season: SEASON| null,
    moreLikeThisTv: MORELIKETHISTV | null
    trendingTv: MORELIKETHISTV | null,
    topRatedTv: MORELIKETHISTV | null
}

const INITIAL_STATE: INITIAL_STATE_TYPE = {
    discoverSeries: null,
    series: null,
    season: null,
    moreLikeThisTv: null,
    trendingTv: null,
    topRatedTv: null
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
        case SeriesActionTypes.GET_SEASON:
            return {
                ...state,
                season: action.payload
            }
        case SeriesActionTypes.GET_SIMILAR_TV:
            return {
                ...state,
                moreLikeThisTv: action.payload
            }
        case SeriesActionTypes.GET_TRENDING_TV:
            return {
                ...state,
                trendingTv: action.payload
            }
        case SeriesActionTypes.GET_TOP_RATED_TV:
            return {
                ...state,
                topRatedTv: action.payload
            }
        case SeriesActionTypes.RESET_TV_STORE:
            return {
                ...state,
                discoverSeries: null,
                series: null,
                season: null
            }
        default:
            return state;
    }
}

export default seriesReducer