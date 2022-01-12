/* eslint-disable react-hooks/rules-of-hooks */
import { AuthActionTypes } from './auth.types';

export const login = (data) => {
    return ({
        type: AuthActionTypes.LOGIN,
        payload: data
    })
}

export const logout = () => {
    return ({
        type: AuthActionTypes.LOGOUT,
    })
}

export const register = (data) => {
    return ({
        type: AuthActionTypes.REGISTER,
        payload: data
    })
}