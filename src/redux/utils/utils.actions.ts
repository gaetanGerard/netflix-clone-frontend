import { UtilsActionTypes } from './utils.types';

export const setApplicationLanguage = (language) => ({
    type: UtilsActionTypes.APPLICATION_LANGUAGE,
    payload: language
})

export const setGenres = (media, genres) => ({
    type: media ===  "movie" ? UtilsActionTypes.MOVIE_GENRES : UtilsActionTypes.SERIES_GENRES,
    payload: genres
})

export const setMediaType = (mediaType) => ({
    type: UtilsActionTypes.MEDIA_TYPE,
    payload: mediaType
})

export const showModal = () => ({
    type: UtilsActionTypes.SHOW_MODAL
})

export const resetShowModal = () => ({
    type: UtilsActionTypes.RESET_SHOW_MODAL
})

export const resetMediaType = () => ({
    type: UtilsActionTypes.RESET_MEDIA_TYPE
})