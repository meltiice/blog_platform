import React from 'react';
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Spin } from 'antd';
import Markdown from 'react-markdown';
import classes from './articlePage.module.scss'
import ArticleInfo from '../articleInfo'
import NotFound from '../notFound/notFound';

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
                              <Markdown className={classes.paragraf}>{article.body}</Markdown></div> : <NotFound />
   content = loading ? null : content;
   const spinner = loading ? <Spin className={classes.spinner}/> : null;
   return (
   <React.Fragment>
      {spinner}
      {content}
   </React.Fragment>
   )
}

ArticlePage.protoTypes = {
   itemId: PropTypes.string
}

export default ArticlePage
