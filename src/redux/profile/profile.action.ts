import { ProfileActionTypes } from './profile.types';

export const selectProfile = (data) => {
    return ({
        type: ProfileActionTypes.SELECTED_PROFILE,
        payload: data
    })
}