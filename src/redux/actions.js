import { FETCH_ARTICLES, LOADER_OFF, LOADER_ON, PUT_PAGE, ERROR, LOG_IN, CREATE_USER, GET_USER_INFO, LOGIN_USER, LOG_OUT, CLEAR_USER } from "./types";

export function fetchArticles(data) {
   return {
      type: FETCH_ARTICLES,
      data
   }
}

export function getUser(data) {
   return {
      type: CREATE_USER,
      data
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

export function errorMessage() {
   return {
      type: ERROR
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