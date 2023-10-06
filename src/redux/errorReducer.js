import { ERROR } from "./types";

const initialState = false;

const errorReducer = (state=initialState, action) => {
   switch (action.type) {
      case ERROR:
         return true;
      default:
         return state;
   }
}

export default errorReducer;