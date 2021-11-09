import { UtilsActionTypes } from './utils.types';

const INITIAL_STATE = {
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