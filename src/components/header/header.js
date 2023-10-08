import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Account from '../account/account';
import classes from './header.module.scss'
import { deleteUser, logOut, errorCancel } from '../../redux/actions';

const Header = () => {
   const dispatch = useDispatch()
   const islogin = useSelector((state) => {
      const { isLogIn } = state;
      return isLogIn;
   })
   const userObj = useSelector((state) => {
      const { user } = state;
      return user
   })

   const handleLogOut = () => {
      localStorage.clear()
      dispatch(errorCancel())
      dispatch(deleteUser())
      dispatch(logOut())
   }

   const account = islogin ? <Link className={classes.litnprof} to={'/profile'}><Account username={userObj.username} pic={userObj.image ? userObj.image : ''}/></Link> : null;
   const signin = islogin ? null : <button className={classes.signin}><span><Link className={`${classes.link} ${classes.login}`} to='/sign-in'>Sign In</Link></span></button>;
   const createArticle = islogin ? <Link to='/new-article'><button className={classes['create-article']}><span>Create Article</span></button></Link> : null
   const inOutButton = islogin ? <button className={classes.logout} onClick={handleLogOut}><span><Link to='/sign-in'>Log Out</Link></span></button> : <button className={classes.signup}><span><Link className={classes.link} to='/sign-up'>Sign Up</Link></span></button>
   return (
   <div className={classes.header}>
      <Link className={classes.a} to={'/articles'}><p className={classes['realworld-blog']}>Realworld blog</p></Link>
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
