import { GET_USER_INFO } from "./types";

const initialState = {}

const userInfoReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_USER_INFO:
         return action.data
      default:
         return state;
   }
}

export default userInfoReducer
