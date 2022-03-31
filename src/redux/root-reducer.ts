import { combineReducers } from 'redux';

import utilsReducer from './utils/utils.reducer';
import authReducer from './auth/auth.reducer';
import profileReducer from './profile/profile.reducer';

export const rootReducer = combineReducers({
    utils: utilsReducer,
    auth: authReducer,
    profile: profileReducer
})

export type RootState = ReturnType<typeof rootReducer>