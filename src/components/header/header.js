import Account from '../account/account';
import classes from './header.module.scss'
import { Link, NavLink } from 'react-router-dom';
// <div className={classes.logout}><span>Log Out</span></div>
//       <div className={classes['create-article']}><span>Create Article</span></div>
// <Account username='Margaret Meltiice' pic='https://sun9-45.userapi.com/impg/HgE_CBBUldz7cZpBEULPpNZoOUAO3sU0CYVrFg/Hb7sigxZI1Q.jpg?size=736x714&quality=95&sign=16785ba708680685f3bba00420961849&type=album'/>
const Header = () => {
   return (
   <div className={classes.header}>
      <p className={classes['realworld-blog']}>Realworld blog</p>
      <div className={classes.rightinfo}>
      <div className={classes.signin}><span><NavLink to='/articles'>Sign In</NavLink></span></div>
      <div className={classes.signup}><span><NavLink to='/'>Sign Up</NavLink></span></div>
      </div>
   </div>
   )
}

export default Header;