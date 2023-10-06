import { GET_USER_INFO } from "./types";

const initialState = {}

export const userInfoReducer = (state=initialState, action) => {
   switch(action.type){
      case GET_USER_INFO:
         return action.data
      default:
         return state;
   }
}