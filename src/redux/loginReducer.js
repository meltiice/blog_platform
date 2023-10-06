import { LOG_IN, LOG_OUT } from "./types";

const initialState = localStorage.getItem('login') ? localStorage.getItem('login') : false;

export const loginReducer = (state=initialState, action) => {
   switch (action.type) {
      case LOG_IN: {
         return true;
      }
      case LOG_OUT: {
         return false;
      }
      default:
         return state;
   }
}