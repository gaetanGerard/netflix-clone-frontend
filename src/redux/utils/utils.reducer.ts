import { UtilsActionTypes } from './utils.types';
import { DISCOVER } from '../../types/discoverTypes';

type LanguageType = {
    label: string,
    iso: string
}

type LanguageOptions = {
    label: string,
    iso: string
}

type GenreType = {
    id: string,
    name: string
}

type INITIAL_STATE_TYPE = {
    language: LanguageType,
    languageOptions: LanguageOptions[],
    movieGenres: GenreType[],
    tvGenres: GenreType[],
    mediaType: string | null,
    showModal: boolean,
    searchResult: DISCOVER | null,
    searchQuery: string | null
}

const INITIAL_STATE: INITIAL_STATE_TYPE = {
    language: {
        label: "Français",
        iso: "fr-FR"
    },
    languageOptions: [{label: "Français", iso: "fr-FR"}, {label: "Nederlands", iso: "nl-BE"}, {label: "English", iso: "en-US"}],
    movieGenres: [
        {id: "28", name: "Action"},
        {id: "12", name: "Aventure"},
        {id: "16", name: "Animation"},
        {id: "35", name: "Comédie"},
        {id: "80", name: "Crime"},
        {id: "99", name: "Documentaire"},
        {id: "18", name: "Drame"},
        {id: "10751", name: "Familial"},
        {id: "14", name: "Fantastique"},
        {id: "36", name: "Histoire"},
        {id: "27", name: "Horreur"},
        {id: "10402", name: "Musique"},
        {id: "9648", name: "Mystère"},
        {id: "10749", name: "Romance"},
        {id: "878", name: "Science-Fiction"},
        {id: "10770", name: "Téléfilm"},
        {id: "53", name: "Thriller"},
        {id: "10752", name: "Guerre"},
        {id: "37", name: "Western"}
    ],
    tvGenres: [
        {id: "10759", name: "Action & Aventure"},
        {id: "16", name: "Animation"},
        {id: "35", name: "Comédie"},
        {id: "80", name: "Crime"},
        {id: "99", name: "Documentaire"},
        {id: "18", name: "Drame"},
        {id: "10751", name: "Familial"},
        {id: "10762", name: "Enfants"},
        {id: "9648", name: "Mystère"},
        {id: "10763", name: "Nouvelles"},
        {id: "10764", name: "Réalité"},
        {id: "10765", name: "Science-Fiction & Fantastique"},
        {id: "10766", name: "Soap"},
        {id: "10767", name: "Talk"},
        {id: "10768", name: "Guerre & Politique"},
        {id: "37", name: "Western"}
    ],
    mediaType: null,
    showModal: false,
    searchResult: null,
    searchQuery: null
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
        case UtilsActionTypes.MOVIE_GENRES:
            return {
                ...state,
                movieGenres: action.payload
            }
        case UtilsActionTypes.SERIES_GENRES:
            return {
                ...state,
                tvGenres: action.payload
            }
        case UtilsActionTypes.MEDIA_TYPE:
            return {
                ...state,
                mediaType: action.payload
            }
        case UtilsActionTypes.RESET_MEDIA_TYPE:
            return {
                ...state,
                mediaType: null
            }
        case UtilsActionTypes.SHOW_MODAL:
            return {
                ...state,
                showModal: true
            }
        case UtilsActionTypes.SEARCH_RESULT:
            return {
                ...state,
                searchResult: action.payload
            }
        case UtilsActionTypes.SEARCH_QUERY:
            return {
                ...state,
                searchQuery: action.payload
            }
        case UtilsActionTypes.RESET_SEARCH_RESULT:
            return {
                ...state,
                searchResult: null
            }
        case UtilsActionTypes.RESET_SHOW_MODAL:
            return {
                ...state,
                showModal: false
            }
        default:
            return state;
    }
}

export default utilsReducer;