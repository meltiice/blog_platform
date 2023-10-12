import { CLEAR_ARTICLES, FETCH_ARTICLES } from './types';

const initialState = {}

const fetchReducer = (state = initialState, action) => {
   switch (action.type) {
      case FETCH_ARTICLES:
         return action.data;
      case CLEAR_ARTICLES:
         return {}
      default:
         return state
   }
}

export default fetchReducer
