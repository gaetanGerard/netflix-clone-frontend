/* eslint-disable react-hooks/rules-of-hooks */
import { SeriesActionTypes } from './series.types';

export const discover_series = (data) => {
    return ({
        type: SeriesActionTypes.DISCOVER_SERIES,
        payload: data.getDiscover
    })
}

export const get_tv = (data) => {
    return ({
        type: SeriesActionTypes.GET_TV,
        payload: data.getSerie
    })
}

export const get_season = (data) => {
    return ({
        type: SeriesActionTypes.GET_SEASON,
        payload: data.getSeason
    })
}

export const get_similar_tv = (data) => {
    return ({
        type: SeriesActionTypes.GET_SIMILAR_TV,
        payload: data.getUpcomTopRatedPopuNowPlayingTV
    })
}

export const get_trending_tv = (data) => {
    return ({
        type: SeriesActionTypes.GET_TRENDING_TV,
        payload: data.getTrending
    })
}

export const get_top_rated_tv = (data) => {
    return ({
        type: SeriesActionTypes.GET_TOP_RATED_TV,
        payload: data.getUpcomTopRatedPopuNowPlayingTV
    })
}

export const reset_tv_store = () => {
    return ({
        type: SeriesActionTypes.RESET_TV_STORE
    })
}