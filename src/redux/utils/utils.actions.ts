import { UtilsActionTypes } from './utils.types';

export const setApplicationLanguage = (language) => ({
    type: UtilsActionTypes.APPLICATION_LANGUAGE,
    payload: language
})