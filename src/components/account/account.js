import PropTypes from 'prop-types'
import classes from './account.module.scss'
import ava from './ava.png'

const Account = (props) => {
   const { username, pic } = props
   const image = pic ? pic : ava;
   return (
      <div className={classes.account}>
         <span className={classes.name}>{username}</span>
         <img className={classes.ava} src={image} alt=""/>
      </div>
   )
}

Account.defaultProps = {
   username: '',
   pic: ''
 };
Account.propTypes = {
   username: PropTypes.string,
   pic: PropTypes.string
 };

export default Account