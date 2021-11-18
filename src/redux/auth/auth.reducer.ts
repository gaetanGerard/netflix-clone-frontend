import { AuthActionTypes } from './auth.types';

type USER = {
    userEmail: string,
    password: string,
    rememberMe?: boolean,
    specialOffers?: boolean
}

type INITIAL_STATE_TYPE = {
    user: USER | null
}

const INITIAL_STATE: INITIAL_STATE_TYPE = {
    user: null
}

const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AuthActionTypes.LOGIN:
            return {
                ...state,
                user: action.payload
            }
        case AuthActionTypes.LOGOUT:
            return {
                ...state,
                user: null
            }
        default:
            return state;
    }
}

export default authReducer