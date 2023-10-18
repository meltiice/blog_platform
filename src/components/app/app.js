import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { Switch } from 'react-router-dom/cjs/react-router-dom.min'
import classes from './app.module.scss'
import Service from '../service'
import Header from '../header'
import ArticlesView from '../articlesView/articlesView'
import ErrorIndicator from '../error/error'
import ArticlePage from '../articlePage'
import SignUp from '../signUp'
import SignIn from '../signIn'
import Profile from '../profile'
import CreateArticle from '../createArticle'
import NotFound from '../notFound/notFound'

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

   const isError = useSelector((state) => {
      const { error } = state;
      return error;
   })

   const error = isError && isError.fetchError && !isError.start ? <ErrorIndicator error={isError}/> : null;

   useEffect(() => {
      dispatch(service.articlesLoad(currentPage, userinfo.token));
   }, [currentPage])

   /* <Route path='/**'> <Redirect to={'/articles'}/></Route> */

   return <div className={classes.app}>
      <Route path='/' component={Header}/>
      <Switch>
         {error}
         <Route path='/sign-up' component={SignUp}/>
         <Route path='/sign-in' component={SignIn}/>
         <Route path='/profile' component={Profile}/>
         <Route path='/articles/:id/edit'
                render = {({ match }) => {
                const { id } = match.params;
                return <CreateArticle itemId={id} username={userinfo.username}/>
               }
                }/>
         <Route path='/new-article' component={CreateArticle}/>
         <Route path='/articles/' exact component={ArticlesView}/>
         <Route path='/articles/:id' exact
                render = {({ match }) => {
                const { id } = match.params;
                return <ArticlePage itemId={id}/>
               }
                }/>
         <Route path="*" component={NotFound} />
         </Switch>
   </div>
}

export default App;
