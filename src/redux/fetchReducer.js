import { FETCH_ARTICLES } from './types';

const initialState = {}

export const fetchReducer = (state = initialState, action) => {
   switch (action.type) {
      case FETCH_ARTICLES:
         return action.data;
      default:
         return state
   }
}
