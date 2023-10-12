import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Account from '../account/account';
import classes from './header.module.scss'
import { deleteUser, logOut, errorStart, clearArticles } from '../../redux/actions';

const Header = () => {
   const dispatch = useDispatch();
   const history = useHistory()
   const islogin = useSelector((state) => {
      const { isLogIn } = state;
      return isLogIn;
   })
   const userObj = useSelector((state) => {
      const { user } = state;
      return user
   })

   const handleLogOut = (e) => {
      e.stopPropagation();
      localStorage.clear()
      dispatch(errorStart())
      dispatch(clearArticles())
      dispatch(deleteUser())
      dispatch(logOut())
      history.push('/sign-in')
   }

   const goToProfile = (e) => {
      e.stopPropagation();
      dispatch(errorStart());
      history.push('/profile')
   }

   const goToSignUp = (e) => {
      e.stopPropagation();
      dispatch(clearArticles())
      dispatch(errorStart())
      history.push('/sign-up')
   }

   const goToSignIn = (e) => {
      e.stopPropagation();
      dispatch(clearArticles())
      dispatch(errorStart())
      history.push('/sign-in')
   }

   const goHome = (e) => {
      e.stopPropagation();
      dispatch(errorStart());
      history.push('/articles')
   }

   const account = islogin ? <Account onClick={goToProfile} username={userObj.username} pic={userObj.image ? userObj.image : ''}/> : null;
   const signin = islogin ? null : <button className={classes.signin} onClick={goToSignIn}><span>Sign In</span></button>;
   const createArticle = islogin ? <Link to='/new-article'><button className={classes['create-article']}><span>Create Article</span></button></Link> : null
   const inOutButton = islogin ? <button className={classes.logout} onClick={handleLogOut}><span>Log Out</span></button> : <button className={classes.signup} onClick={goToSignUp}><span>Sign Up</span></button>
   return (
   <div className={classes.header}>
      <button className={classes['realworld-blog']} onClick={goHome}>Realworld blog</button>
      <div className={classes.rightinfo}>
      {createArticle}
      {account}
      {signin}
      {inOutButton}
      </div>
   </div>
   )
}

export default Header;
