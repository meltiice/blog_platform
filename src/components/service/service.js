import { errorCancel, fetchArticles, getUser, logIn, loginUser, loaderOn, loaderOff, errorMessage, getUserInfo, sendArticle, getArticle, deleteArticleFromApi } from "../../redux/actions";

export default class Service {
   url = 'https://blog.kata.academy/api/';

   async getResourse(urlEnd, token) {
      const options = token ? { headers: {
         Authorization: `Bearer ${token}`
      } } : null
      const result = await fetch(`${this.url}${urlEnd}`, options)
      .catch((res) => res)
      return result;
   }

   async putResourse(urlEnd, token, body) {
      const result = await fetch(`${this.url}${urlEnd}`, {
         method: "PUT",
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
         },
         body: JSON.stringify(body)
       }).catch((res) => res)
      return result;
   }

   async deleteResourse(urlEnd, token) {
      const result = await fetch(`${this.url}${urlEnd}`, {
         method: "DELETE",
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
         }
       }).catch((res) => res)
      return result;
   }

   async createResourse(urlEnd, body, token) {
      console.log('CREATE RESOURSE')
      const tok = token ? { Authorization: `Bearer ${token}` } : {};
      const bod = body ? { body: JSON.stringify(body) } : {}
      console.log(tok, bod)
      const result = await fetch(`${this.url}${urlEnd}`, {
         method: "POST",
         headers: {
            'Content-Type': 'application/json',
            ...tok
         },
         ...bod
       }).catch((res) => {
         console.log('FETCH ERROR ', res)
         return res;
      })
      return result;
   }

   createArticle = (token, data) => async (dispatch) => {
         dispatch(errorCancel())
         const article = await this.createResourse('articles', data, token)
         if (article) {
            const info = await article.json()
            dispatch(sendArticle(info.article));
         } else {
            dispatch(errorMessage(article.errors))
         }
      }

   likePost = (id, token) => async () => {
         await this.createResourse(`/articles/${id}/favorite`, null, token)
      }

   unlikePost = (id, token) => async () => {
         await this.deleteResourse(`/articles/${id}/favorite`, token)
      }

   deleteArtFromApi = (slug, token) => async (dispatch) => {
         await this.deleteResourse(`/articles/${slug}`, token)
         dispatch(deleteArticleFromApi())
      }

   putUserInfo = (token, data) => async (dispatch) => {
         const user = await this.putResourse('user', token, data);
         if (user.ok) {
            dispatch(errorCancel())
            const info = await user.json()
            console.log(user)
            dispatch(getUser(info.user))
            localStorage.setItem('user', JSON.stringify(info.user))
         } else {
            const info = await user.json()
            console.log(info)
            dispatch(errorMessage(info.errors))
         }
      }

   putArticle = (token, data, id) => async (dispatch) => {
         dispatch(errorCancel())
         const article = await this.putResourse(`articles/${id}`, token, data);
         if (article) {
            await article.json()
         } else {
            dispatch(errorMessage(article.errors))
         }
      }

   createUser = (data) => async (dispatch) => {
         dispatch(errorCancel())
         const user = await this.createResourse('users', data)
         if (user) {
            const userInfo = await user.json()
            dispatch(getUser(userInfo.user));
            localStorage.setItem('user', JSON.stringify(userInfo.user))
            dispatch(logIn()) //! !!!!!!!!
            localStorage.setItem('login', true)
         } else {
            dispatch(errorMessage(user.errors))
         }
   }

   loginUserIn = (data) => async (dispatch) => {
         dispatch(errorCancel())
         console.log('data: ', data)
         const user = await this.createResourse('users/login', data)
         if (user.ok) {
            console.log('JSON')
            const userInfo = await user.json()
            dispatch(loginUser(userInfo.user));
            console.log('local storage')
            localStorage.setItem('user', JSON.stringify(userInfo.user))
            dispatch(logIn())
            localStorage.setItem('login', true)
         } else {
            const userInfo = await user.json()
            console.log('error')
            console.log(userInfo)
            dispatch(errorMessage(userInfo.errors))
         }
         }

   getUserInfoThunk = (token) => async (dispatch) => {
         dispatch(errorCancel())
         const user = await this.getResourse('user', token)
         if (user.ok) {
            const userInfo = await user.json();
            dispatch(getUserInfo(userInfo.user))
         } else {
            dispatch(errorMessage(user.errors))
         }
      }

   articlesLoad = (page, token) => async (dispatch) => {
         dispatch(errorCancel())
         dispatch(loaderOn());
         const articles = await this.getResourse(`articles?offset=${(page - 1) * 20}`, token);
         if (articles.ok) {
            const arts = await articles.json()
            dispatch(fetchArticles(arts.articles));
         } else {
            dispatch(errorMessage(articles.errors))
         }
         dispatch(loaderOff());
      }

   getArticle = (id, token) => async (dispatch) => {
         dispatch(errorCancel())
         dispatch(loaderOn());
         const article = await this.getResourse(`articles/${id}`, token);
         if (article.ok) {
            const arts = await article.json()
            dispatch(getArticle(arts.article));
         } else {
            dispatch(errorMessage(article.errors))
         }
         dispatch(loaderOff());
      }
}
