import { LOADER_ON, LOADER_OFF } from "./types";

const initialState = true;

const loaderReducer = (state = initialState, action) => {
   switch (action.type) {
      case LOADER_ON: {
         return true;
      }
      case LOADER_OFF: {
         return false;
      }
      default:
         return state;
   }
}

export default loaderReducer
