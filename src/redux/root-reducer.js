import { combineReducers } from 'redux';

import utilsReducer from './utils/utils.reducer';

export default combineReducers({
    utils: utilsReducer
})