import { CREATE_ARTICLE, DELETE_ARTICLE } from "./types";

const initialState = []

const articleReducer = (state = initialState, action) => {
   switch (action.type) {
      case CREATE_ARTICLE:
         return [
            ...state,
            action.data
         ]
      case DELETE_ARTICLE:
         return []
      default:
         return state;
   }
}
export default articleReducer
