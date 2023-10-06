import { combineReducers } from 'redux';
import { fetchReducer } from './fetchReducer';
import { loaderReducer } from './loaderReducer';
import { pageReducer } from './pageReducer';
import errorReducer from './errorReducer';

export const rootReducer = combineReducers({
   articles: fetchReducer,
   loader: loaderReducer,
   page: pageReducer,
   error: errorReducer
})