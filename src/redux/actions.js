import { FETCH_ARTICLES, LOADER_OFF, LOADER_ON, PUT_PAGE, DELETE_ARTICLE, ERROR, ERROR_CANCEL, LOG_IN, CREATE_USER, GET_USER_INFO, LOGIN_USER, LOG_OUT, CLEAR_USER, CREATE_ARTICLE, GET_ARTICLE, DELETE_ARTICLE_STATE, ERROR_START, CLEAR_ARTICLES, ERROR_FETCH, LIKE } from "./types";

export function fetchArticles(data) {
   return {
      type: FETCH_ARTICLES,
      data
   }
}

export function clearArticles() {
   return {
      type: CLEAR_ARTICLES
   }
}

export function getArticle(data) {
   return {
      type: GET_ARTICLE,
      data
   }
}

export function deleteArticle() {
   return {
      type: DELETE_ARTICLE_STATE
   }
}

export function sendArticle(data) {
   return {
      type: CREATE_ARTICLE,
      data
   }
}

export function setLike(data) {
   return {
      type: LIKE,
      data
   }
}

export function getUser(data) {
   return {
      type: CREATE_USER,
      data
   }
}

export function deleteArticleFromApi() {
   return {
      type: DELETE_ARTICLE
   }
}

export function deleteUser() {
   return {
      type: CLEAR_USER,
   }
}

export function loginUser(data) {
   return {
      type: LOGIN_USER,
      data
   }
}

export function getUserInfo(data) {
   return {
      type: GET_USER_INFO,
      data
   }
}

export function errorMessage(data) {
   return {
      type: ERROR,
      data
   }
}

export function errorFetch() {
   return {
      type: ERROR_FETCH
   }
}

export function errorCancel() {
   return {
      type: ERROR_CANCEL
   }
}

export function errorStart() {
   return {
      type: ERROR_START
   }
}

export function logIn() {
   return {
      type: LOG_IN
   }
}

export function logOut() {
   return {
      type: LOG_OUT
   }
}

export function loaderOn() {
   return {
      type: LOADER_ON
   }
}

export function loaderOff() {
   return {
      type: LOADER_OFF
   }
}

export function putPage(page) {
   return {
      type: PUT_PAGE,
      page
   }
}
