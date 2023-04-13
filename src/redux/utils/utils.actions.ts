import { UtilsActionTypes } from './utils.types';

export const setApplicationLanguage = (language) => ({
    type: UtilsActionTypes.APPLICATION_LANGUAGE,
    payload: language
})

export const setGenres = (media, genres) => ({
    type: media ===  "movie" ? UtilsActionTypes.MOVIE_GENRES : UtilsActionTypes.SERIES_GENRES,
    payload: genres
})