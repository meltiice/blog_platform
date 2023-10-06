import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Router } from "react-router"
import classes from './app.module.scss'
import Service from '../service'
import Header from '../header'
import ArticlesView from '../articlesView/articlesView'
import ErrorIndicator from '../error/error'
import ArticlePage from '../articlePage'
import { createBrowserHistory } from "history";

const appHistory = createBrowserHistory();

const App = () => {
   const service = new Service()
   const dispatch = useDispatch();

   const currentPage = useSelector((state) => {
      const { page } = state;
      return page;
   })

   const isError = useSelector((state) => {
      const { error } = state;
      return error;
   })

   const error = isError ? <ErrorIndicator /> : null;

   useEffect(() => {
      dispatch(service.articlesLoad(currentPage));
   }, [currentPage])

   return <div className={classes.app}>
      <BrowserRouter>
         <Route path='/' component={Header}/>
         {error}
         <Route path='/articles/' exact component={ArticlesView}/>
         <Route path='/articles/:id'
                render = {({ match }) => {
                const { id } = match.params;
                return <ArticlePage itemId={id}/>
               }
                }/>
      </BrowserRouter>
   </div>
}

export default App;