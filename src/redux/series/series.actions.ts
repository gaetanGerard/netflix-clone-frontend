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

export const reset_tv_store = () => {
    return ({
        type: SeriesActionTypes.RESET_TV_STORE
    })
}