import { ERROR, ERROR_CANCEL } from "./types";

const initialState = null;

const errorReducer = (state = initialState, action) => {
   switch (action.type) {
      case ERROR:
         return action.data;
      case ERROR_CANCEL:
         return null
      default:
         return state;
   }
}

export default errorReducer;
