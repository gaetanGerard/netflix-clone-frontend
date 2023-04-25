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

export const setSearchResult = (result) => ({
    type: UtilsActionTypes.SEARCH_RESULT,
    payload: result
})

export const setSearchQuery = (query) => ({
    type: UtilsActionTypes.SEARCH_QUERY,
    payload: query
})

export const resetSearchResult = () => ({
    type: UtilsActionTypes.RESET_SEARCH_RESULT
})

export const resetShowModal = () => ({
    type: UtilsActionTypes.RESET_SHOW_MODAL
})

export const resetMediaType = () => ({
    type: UtilsActionTypes.RESET_MEDIA_TYPE
})