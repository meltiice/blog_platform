import React from 'react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Spin } from 'antd';
import Markdown from 'react-markdown';
import classes from './articlePage.module.scss'
import ArticleInfo from '../articleInfo'

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

    const login = useSelector((state) => {
      const { isLogIn } = state;
      return isLogIn
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
                              login={login}
                              slug={article.slug}
                              />
                              <Markdown className={classes.paragraf}>{article.body}</Markdown></div> : <div className={classes['no-article']}>
                                 <p>No such an Article</p>
                                 <p><Link to={`/articles/`}>Go back</Link></p>
                              </div>
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
