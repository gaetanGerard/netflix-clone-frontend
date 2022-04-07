/* eslint-disable react-hooks/rules-of-hooks */
import { SeriesActionTypes } from './series.types';

export const discover_series = (data) => {
    return ({
        type: SeriesActionTypes.DISCOVER_SERIES,
        payload: data.getDiscover
    })
}