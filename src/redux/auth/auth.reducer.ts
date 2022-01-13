import { AuthActionTypes } from './auth.types';

type USER = {
    _id: string,
    email: string,
    password: string,
    token: string,
    firstname: string,
    lastname: string,
    date_of_birth: string,
    gender: number,
    profile_pic: string,
    description: string,
    created_at: string,
    updated_at: string,
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
                user: action.payload,
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