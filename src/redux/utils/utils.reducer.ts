import { UtilsActionTypes } from './utils.types';

type LanguageType = {
    label: string,
    iso: string
}

type LanguageOptions = {
    label: string,
    iso: string
}

type INITIAL_STATE_TYPE = {
    language: LanguageType,
    languageOptions: LanguageOptions[]
}

const INITIAL_STATE: INITIAL_STATE_TYPE = {
    language: {
        label: "Français",
        iso: "fr-FR"
    },
    languageOptions: [{label: "Français", iso: "fr-FR"}, {label: "Nederlands", iso: "nl-BE"}, {label: "English", iso: "en-US"}]
}

const utilsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UtilsActionTypes.APPLICATION_LANGUAGE:
            switch (action.payload) {
                case "nl-BE":
                    return {
                        ...state,
                        language: {
                            label: "Nederlands",
                            iso: "nl-BE"
                        }
                    }
                case "en-US":
                    return {
                        ...state,
                        language: {
                            label: "English",
                            iso: "en-US"
                        }
                    }
                case "fr-FR":
                default:
                    return {
                        ...state,
                        language: {
                            label: "Français",
                            iso: "fr-FR"
                        }
                    }
            }
        default:
            return state;
    }
}

export default utilsReducer;