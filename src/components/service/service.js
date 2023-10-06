import { fetchArticles, getUser, logIn, loginUser } from "../../redux/actions";
import { loaderOn, loaderOff, errorMessage, getUserInfo } from "../../redux/actions";

export default class Service {
   url = 'https://blog.kata.academy/api/';

   async getResourse(urlEnd, token) {
      const options = token ? {headers: {
         'Authorization': `Bearer ${token}`
      }} : null
      const result = await fetch(`${this.url}${urlEnd}`, options)
      .catch((res) => {
         return res;
      })
      return result;
   }

   async putResourse(urlEnd, token, body) {
      const result = await fetch(`${this.url}${urlEnd}`, {
         method: "PUT",
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
         },
         body: JSON.stringify(body)
       }).catch((res) => {
         console.log(res)
         return res;
      })
      return result;
   }

   async createResourse(urlEnd, body) {
      const result = await fetch(`${this.url}${urlEnd}`, {
         method: "POST",
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(body)
       }).catch((res) => {
         console.log(res)
         return res;
      })
      return result;
   }

   putUserInfo = (token, data) => {
      return async (dispatch) => {
         const user = await this.putResourse('user', token, data);
         if (user){
            const info = await user.json()
            dispatch(getUser(info.user))
            localStorage.setItem('user', JSON.stringify(info.user))
         }
      }
   }


   createUser = (data) => {
      console.log('createuser',data)
      return async (dispatch) => {
         const user = await this.createResourse('users', data)
         console.log(user)
         if (user) {
            const userInfo = await user.json()
            console.log(userInfo, userInfo.user)
            dispatch(getUser(userInfo.user));
            localStorage.setItem('user', JSON.stringify(userInfo.user))
            dispatch(logIn()) //!!!!!!!!!
            localStorage.setItem('login', true)
         } else {
            console.log('user error')
         }
   }
}
   loginUserIn = (data) => {
      console.log('DATA',data)
      return async (dispatch) => {
         const user = await this.createResourse('users/login', data)
         console.log('USER', user)
         if (user.ok) {
            const userInfo = await user.json()
            console.log('ASUNC', userInfo)
            dispatch(loginUser(userInfo.user));
            localStorage.setItem('user', JSON.stringify(userInfo.user))
            dispatch(logIn())
            localStorage.setItem('login', true)
         } else {
            console.log('user error')
         }
         }
      }

   getUserInfoThunk = (token) => {
      return async (dispatch) => {
         const user = await this.getResourse('user', token)
         if (user.ok) {
            const userInfo = await user.json();
            console.log(userInfo);
            dispatch(getUserInfo(userInfo.user))
         }
      }
   }

   articlesLoad = (page) => {
      return async (dispatch) => {
         dispatch(loaderOn());
         const articles = await this.getResourse(`articles?offset=${(page - 1)*20}`);
         if (articles.ok) {
            const arts = await articles.json()
            dispatch(fetchArticles(arts.articles));
         } else {
            dispatch(errorMessage())
         }
         dispatch(loaderOff());
      }
   }
}