import { combineReducers } from 'redux';

import utilsReducer from './utils/utils.reducer';
import authReducer from './auth/auth.reducer';
import profileReducer from './profile/profile.reducer';
import moviesReducer from './movies/movies.reducer';
import seriesReducer from './series/series.reducer';

export const rootReducer = combineReducers({
    utils: utilsReducer,
    auth: authReducer,
    profile: profileReducer,
    movies: moviesReducer,
    series: seriesReducer
})

export type RootState = ReturnType<typeof rootReducer>