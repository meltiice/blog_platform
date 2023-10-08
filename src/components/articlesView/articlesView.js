import { useHistory, withRouter } from 'react-router-dom'
import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Spin, Pagination } from "antd";
import classes from './articlesView.module.scss'
import Article from "../article/article"
import { putPage } from '../../redux/actions';

const ArticlesView = () => {
   let currentPage = 1;
   const dispatch = useDispatch();
   const history = useHistory();

   function handleClick(id) {
      history.push({ pathname: `/articles/${id}` });
    }

   const onChange = (page) => {
      dispatch(putPage(page));
   };

   currentPage = useSelector((state) => {
      const { page } = state;
      return page;
   })
   const articlesArray = useSelector((state) => {
      const { articles } = state;
      return articles;
    })
    const loading = useSelector((state) => {
      const { loader } = state;
      return loader;
    })

   const articles = articlesArray.length > 0 ? articlesArray.map((article, idx) => (
      <li key={idx} onClick={() => handleClick(article.slug)}>
         <Article
                  title={article.title}
                  text={article.description}
                  tagsList={article.tagList}
                  author={article.author}
                  likes={article.favoritesCount}
                  isLiked={article.favorited}
                  slug={article.slug}
      /></li>
      )) : null;
   console.log(articlesArray)
   const spinner = loading ? <Spin className={classes.spin}/> : null
   const pagination = !loading && articlesArray.length > 0 ? (
         <Pagination
           className={classes.pagination}
           current={currentPage}
           showSizeChanger={false}
           onChange={(e) => onChange(e)}
           total={100}
         />) : null;
   return (
      <React.Fragment>
      {spinner}
      <ul className={classes.articles}>
         {articles}
      </ul>
      {pagination}
      </React.Fragment>
   )
}

export default withRouter(ArticlesView)
