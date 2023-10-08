import { GET_ARTICLE, DELETE_ARTICLE_STATE } from "./types";

const initialState = null;

const getArticleReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_ARTICLE: {
         return action.data;
      }
      case DELETE_ARTICLE_STATE: {
         return null;
      }
      default:
         return state;
   }
}
export default getArticleReducer
