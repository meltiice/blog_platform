import { CLEAR_USER, CREATE_USER, LOGIN_USER } from './types';

const initialState = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}

const userReducer = (state = initialState, action) => {
   switch (action.type) {
      case CREATE_USER:
         return action.data;
      case LOGIN_USER:
         return action.data;
      case CLEAR_USER: {
         return {}
      }
      default:
         return state
   }
}

export default userReducer
