import { ERROR, ERROR_CANCEL, ERROR_START } from "./types";

const initialState = null;

const errorReducer = (state = initialState, action) => {
   switch (action.type) {
      case ERROR:
         return action.data;
      case ERROR_CANCEL:
         return null
      case ERROR_START:
         return { start: true }
      default:
         return state;
   }
}

export default errorReducer;
