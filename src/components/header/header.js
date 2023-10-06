import useSelection from 'antd/es/table/hooks/useSelection';
import Account from '../account/account';
import classes from './header.module.scss'
import Service from '../service';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, logOut } from '../../redux/actions';
// <div className={classes.logout}><span>Log Out</span></div>
//       <div className={classes['create-article']}><span>Create Article</span></div>
// <Account username='Margaret Meltiice' pic='https://sun9-45.userapi.com/impg/HgE_CBBUldz7cZpBEULPpNZoOUAO3sU0CYVrFg/Hb7sigxZI1Q.jpg?size=736x714&quality=95&sign=16785ba708680685f3bba00420961849&type=album'/>
const Header = () => {
   const dispatch = useDispatch()
   const service = new Service();
   const islogin = useSelector((state) => {
      const { isLogIn } = state;
      return isLogIn;
   })
   const userObj = useSelector((state) => {
      const {user} = state;
      return user
   })

   const handleLogOut = () => {
      localStorage.clear()
      dispatch(deleteUser())
      dispatch(logOut())
   }


   const account = islogin ? <Link className={classes.litnprof} to={'/profile'}><Account username={userObj.username} pic={userObj.image ? userObj.image : ''}/></Link> : null;
   const signin = islogin ? null : <button className={classes.signin}><span><Link className={`${classes.link} ${classes.login}`} to='/sign-in'>Sign In</Link></span></button>;
   const createArticle = islogin ? <button className={classes['create-article']}><span>Create Article</span></button> : null
   const inOutButton = islogin ? <button className={classes.logout} onClick={handleLogOut}><span><Link to='/sign-in'>Log Out</Link></span></button> : <button className={classes.signup}><span><Link className={classes.link} to='/sign-up'>Sign Up</Link></span></button>
   return (
   <div className={classes.header}>
      <p className={classes['realworld-blog']}>Realworld blog</p>
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