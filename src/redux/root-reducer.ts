import { combineReducers } from 'redux';

import utilsReducer from './utils/utils.reducer';
import authReducer from './auth/auth.reducer';

export const rootReducer = combineReducers({
    utils: utilsReducer,
    auth: authReducer
})

export type RootState = ReturnType<typeof rootReducer>