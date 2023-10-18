import { errorCancel, fetchArticles, getUser, logIn, loginUser, loaderOn, loaderOff, errorMessage, sendArticle, getArticle, errorStart, deleteArticle, errorFetch, clearArticles } from "../../redux/actions";

export default class Service {
   url = 'https://blog.kata.academy/api/';

   async getResourse(urlEnd, token) {
      const options = token ? { headers: {
         Authorization: `Bearer ${token}`
      } } : null
      const result = await fetch(`${this.url}${urlEnd}`, options)
      .catch((err) => err)
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
      const tok = token ? { Authorization: `Bearer ${token}` } : {};
      const bod = body ? { body: JSON.stringify(body) } : {}
      const result = await fetch(`${this.url}${urlEnd}`, {
         method: "POST",
         headers: {
            'Content-Type': 'application/json',
            ...tok
         },
         ...bod
       }).catch((res) => res)
      return result;
   }

   createArticle = (token, data) => async (dispatch) => {
         dispatch(errorCancel())
         dispatch(errorStart())
         const article = await this.createResourse('articles', data, token)
         if (article) {
            const info = await article.json()
            dispatch(sendArticle(info.article));
            window.location.reload();
         } else {
            dispatch(errorMessage(article.errors))
         }
      }

   likePost = (id, token) => async () => {
         await this.createResourse(`/articles/${id}/favorite`, null, token);
      }

   unlikePost = (id, token) => async () => {
         await this.deleteResourse(`/articles/${id}/favorite`, token)
      }

   deleteArtFromApi = (slug, token) => async (dispatch) => {
         await this.deleteResourse(`/articles/${slug}`, token)
         dispatch(deleteArticle())
         window.location.reload();
      }

   putUserInfo = (token, data) => async (dispatch) => {
         dispatch(loaderOn())
         const user = await this.putResourse('user', token, data);
         if (user.ok) {
            dispatch(errorStart())
            const info = await user.json()
            dispatch(getUser(info.user))
            localStorage.setItem('user', JSON.stringify(info.user))
            window.location.reload();
         } else {
            const info = await user.json()
            dispatch(errorMessage(info.errors))
         }
         dispatch(loaderOff())
      }

   putArticle = (token, data, id) => async (dispatch) => {
         dispatch(errorCancel())
         dispatch(loaderOn())
         const article = await this.putResourse(`articles/${id}`, token, data);
         if (article) {
            await article.json()
            window.location.reload();
         } else {
            dispatch(errorMessage(article.errors))
         }
         dispatch(loaderOff())
      }

   createUser = (data) => async (dispatch) => {
         dispatch(errorStart())
         dispatch(loaderOn())
         const user = await this.createResourse('users', data)
         if (user.ok) {
            const userInfo = await user.json()
            dispatch(getUser(userInfo.user));
            localStorage.setItem('user', JSON.stringify(userInfo.user))
            dispatch(logIn())
            localStorage.setItem('login', true)
         } else {
            const res = await user.json()
            dispatch(errorMessage(res.errors))
         }
         dispatch(loaderOff())
   }

   loginUserIn = (data) => async (dispatch) => {
         dispatch(loaderOn())
         const user = await this.createResourse('users/login', data)
         if (user.ok) {
            const userInfo = await user.json()
            dispatch(loginUser(userInfo.user));
            localStorage.setItem('user', JSON.stringify(userInfo.user))
            dispatch(errorStart())
            dispatch(logIn())
            localStorage.setItem('login', true)
         } else {
            const userInfo = await user.json()
            dispatch(errorMessage(userInfo.errors))
         }
         dispatch(loaderOff())
      }

   articlesLoad = (page, token) => async (dispatch) => {
      dispatch(errorCancel())
         dispatch(loaderOn());
         const articles = await this.getResourse(`articles?offset=${(page - 1) * 20}`, token);
         if (articles.ok) {
            const arts = await articles.json()
            dispatch(fetchArticles(arts.articles));
         } else {
            console.log(articles)
            try {
               const res = await articles.json()
               dispatch(errorFetch(res.errors))
               dispatch(clearArticles())
            } catch (err) {
               console.log('catch')
            }
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
