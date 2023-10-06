import React from 'react';
import { useSelector } from 'react-redux'
import ArticleInfo from '../articleInfo'
import classes from './articlePage.module.scss'
import { element } from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Spin } from 'antd';

const ArticlePage = (props) => {
   const { itemId } = props;
   const articlesArray = useSelector((state) => {
      const { articles } = state;
      return articles;
    })
    const loading = useSelector((state) => {
      const { loader } = state;
      return loader;
    })
    let article = null;
    if (articlesArray.length > 0) {
      articlesArray.forEach((el) => {
         if (el.slug === itemId) {
            console.log(true)
            article = { ...el }
         }
      });
    }
   let content = article ? <div className={classes['article-page']}>
                              <ArticleInfo 
                              title={article.title}
                              text={article.description}
                              tagsList={article.tagList}
                              author={article.author}
                              likes={article.favoritesCount}
                              isLiked={article.favorited}
                              />
                              <p className={classes.paragraf}>{article.body}</p></div> : <div className={classes['no-article']}>
                                 <p>No such an Article</p>
                                 <p><Link to={`/articles/`}>Go back</Link></p>
                              </div>;
   content = loading ? null : content;
   const spinner = loading ? <Spin className={classes.spinner}/> : null;
   return (
   <React.Fragment>
      {spinner}
      {content}
   </React.Fragment>
   )
}

export default ArticlePage