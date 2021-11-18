import { UtilsActionTypes } from './utils.types';

type LanguageType = {
    name: string,
    iso: string
}

type INITIAL_STATE_TYPE = {
    language: LanguageType,
    languageOptions: string[]
}

const INITIAL_STATE: INITIAL_STATE_TYPE = {
    language: {
        name: "Français",
        iso: "fr-FR"
    },
    languageOptions: ["Français", "Nederlands", "English"]
}

const utilsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UtilsActionTypes.APPLICATION_LANGUAGE:
            switch (action.payload) {
                case "Nederlands":
                    return {
                        ...state,
                        language: {
                            name: "Nederlands",
                            iso: "nl-BE"
                        }
                    }
                case "English":
                    return {
                        ...state,
                        language: {
                            name: "English",
                            iso: "en-EN"
                        }
                    }
                case "Français":
                default:
                    return {
                        ...state,
                        language: {
                            name: "Français",
                            iso: "fr-FR"
                        }
                    }
            }
        default:
            return state;
    }
}

export default utilsReducer;