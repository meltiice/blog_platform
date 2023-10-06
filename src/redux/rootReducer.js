import { combineReducers } from 'redux';
import { fetchReducer } from './fetchReducer';
import { loaderReducer } from './loaderReducer';
import { pageReducer } from './pageReducer';
import errorReducer from './errorReducer';
import { loginReducer } from './loginReducer';
import { userReducer } from './userReducer';
import { userInfoReducer } from './userInfoReducer';

export const rootReducer = combineReducers({
   articles: fetchReducer,
   loader: loaderReducer,
   page: pageReducer,
   error: errorReducer,
   isLogIn: loginReducer,
   user: userReducer,
   userInfo: userInfoReducer
})