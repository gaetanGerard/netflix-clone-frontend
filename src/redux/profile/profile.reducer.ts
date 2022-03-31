import { ProfileActionTypes } from './profile.types';

type PROFILE = {
    p_name: string,
    kid: boolean,
    language: string,
    token: string,
    profile_pic: number,
    autoplay_next_episode: boolean,
    autoplay_preview: boolean,
}

type INITIAL_STATE_TYPE = {
    profile: PROFILE | null
}

const INITIAL_STATE: INITIAL_STATE_TYPE = {
    profile: null
}

const profileReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ProfileActionTypes.SELECTED_PROFILE:
            return {
                ...state,
                profile: action.payload,
            }
        default:
            return state;
    }
}

export default profileReducer