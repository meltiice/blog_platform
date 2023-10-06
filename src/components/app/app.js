import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
// import { Route } from 'react-router-dom/cjs/react-router-dom.min'
import { Route } from 'react-router-dom'
import classes from './app.module.scss'
import Service from '../service'
import Header from '../header'
import ArticlesView from '../articlesView/articlesView'
import ErrorIndicator from '../error/error'
import ArticlePage from '../articlePage'
import SignUp from '../signUp'
import SignIn from '../signIn'
import Profile from '../profile'
import { getUser } from '../../redux/actions'

const App = () => {
   const service = new Service()
   const dispatch = useDispatch();

   const currentPage = useSelector((state) => {
      const { page } = state;
      return page;
   })

   const userinfo = useSelector((state) => {
      const { user } = state;
      return user;
   })

   /* if (Object.keys(userinfo).length === 0 && localStorage.getItem('user')) {
      dispatch(getUser(Object(localStorage.getItem('user'))))
   } */

   const loged = useSelector((state) => {
      const { isLogIn } = state;
      return isLogIn;
   })
   /*
   if (!loged && localStorage.getItem('login')) {
      dispatch(getUser(Boolean(localStorage.getItem('login'))))
   } */


   const isError = useSelector((state) => {
      const { error } = state;
      return error;
   })

   const error = isError ? <ErrorIndicator /> : null;

   useEffect(() => {

   }, [])

   useEffect(() => {
      dispatch(service.articlesLoad(currentPage));
   }, [currentPage])

   return <div className={classes.app}>
         <Route path='/' component={Header}/>
         {error}
         <Route path='/sign-up' exact component={SignUp}/>
         <Route path='/sign-in' exact component={SignIn}/>
         <Route path='/profile' exact component={Profile}/>
         <Route path='/articles/' exact component={ArticlesView}/>
         <Route path='/articles/:id' exact
                render = {({ match }) => {
                const { id } = match.params;
                return <ArticlePage itemId={id}/>
               }
                }/>
   </div>
}

export default App;