import { combineReducers } from 'redux';

import utilsReducer from './utils/utils.reducer';
import authReducer from './auth/auth.reducer';

export default combineReducers({
    utils: utilsReducer,
    auth: authReducer
})