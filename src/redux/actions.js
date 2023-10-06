import { FETCH_ARTICLES, LOADER_OFF, LOADER_ON, PUT_PAGE, ERROR } from "./types";

export function fetchArticles(data) {
   return {
      type: FETCH_ARTICLES,
      data
   }
}

export function errorMessage() {
   return {
      type: ERROR
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