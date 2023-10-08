import { combineReducers } from '@reduxjs/toolkit';
import fetchReducer from './fetchReducer';
import loaderReducer from './loaderReducer';
import pageReducer from './pageReducer';
import errorReducer from './errorReducer';
import loginReducer from './loginReducer';
import userReducer from './userReducer';
import userInfoReducer from './userInfoReducer';
import articleReducer from './articleReducer';
import getArticleReducer from './getArticleReducer';

export const rootReducer = combineReducers({
   articles: fetchReducer,
   loader: loaderReducer,
   page: pageReducer,
   error: errorReducer,
   isLogIn: loginReducer,
   user: userReducer,
   userInfo: userInfoReducer,
   userArticles: articleReducer,
   currentArticle: getArticleReducer
})
