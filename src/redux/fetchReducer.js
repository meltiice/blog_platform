import { CLEAR_ARTICLES, FETCH_ARTICLES, LIKE } from './types';

const initialState = {}

const fetchReducer = (state = initialState, action) => {
   switch (action.type) {
      case FETCH_ARTICLES:
         return action.data;
      case CLEAR_ARTICLES:
         return {}
      case LIKE:
         const newState = state.length > 0 ? [...state].map((el) => {
            const fav = el.favorited;
            const countlikes = fav ? el.favoritesCount - 1 : el.favoritesCount + 1;
            const newElement = el.slug === action.data ? { ...el, favorited: !fav, favoritesCount: countlikes } : { ...el };
            return newElement;
         }) : [];
         return newState;
      default:
         return state
   }
}

export default fetchReducer
