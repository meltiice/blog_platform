import { PUT_PAGE } from "./types";

const initialState = localStorage.getItem('page') ? localStorage.getItem('page') : 1;

const pageReducer = (state = initialState, action) => {
   switch (action.type) {
      case PUT_PAGE: {
         return action.page;
      }
      default:
         return state;
   }
}

export default pageReducer
