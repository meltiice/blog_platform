import { fetchArticles } from "../../redux/actions";
import { loaderOn, loaderOff, errorMessage } from "../../redux/actions";

export default class Service {
   url = 'https://blog.kata.academy/api/';

   async getArticles(page) {
      const result = await fetch(`${this.url}articles?offset=${(page - 1)*20}`)
      .catch((res) => {
         return res;
      })
      return result;
   }

   articlesLoad = (page) => {
      return async (dispatch) => {
         dispatch(loaderOn());
         const articles = await this.getArticles(page);
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