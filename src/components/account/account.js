import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ava from './ava.png'
import classes from './account.module.scss'
import Service from '../service/service'

const Account = (props) => {
   const [deleteFlag, setDeleteFlag] = useState(false)
   const { username, pic, login, slug, onClick } = props
   const history = useHistory();
   const image = pic || ava;
   const dispatch = useDispatch()
   const service = new Service()

   const myUn = useSelector((state) => {
      const { user } = state;
      const us = Object.keys(user).length > 0 ? user.username : '';
      return us;
   })
   const mytoken = useSelector((state) => {
      const { user } = state;
      const tkn = Object.keys(user).length > 0 ? user.token : '';
      return tkn;
   })
   const isLoading = useSelector((state) => {
      const { loader } = state;
      return loader;
   })
   const handlerDelete = () => {
      setDeleteFlag(true)
   }
   const deleteButtonPush = () => {
      dispatch(service.deleteArtFromApi(slug, mytoken))
      history.push('/articles')
   }
   const handlerEdit = () => {
      history.push(`/articles/${slug}/edit`)
   }
   const cancelButton = () => {
      setDeleteFlag(false)
   }
   const modal = deleteFlag ? <div className={classes.modal}><div className={classes.cont}>
         <p>Do you sure you what to delete this article?</p>
         <div className={classes.container}>
         <button className={classes.yes} onClick={deleteButtonPush} disabled={isLoading}>Yes</button>
         <button onClick={cancelButton}>No</button>
         </div>
      </div></div> : null;
   const deleteButton = login && (username === myUn) ? <button onClick={handlerDelete} className={classes.delete}>Delete</button> : null;
   const editButton = login && (username === myUn) ? <button onClick={handlerEdit} className={classes.edit}>Edit</button> : null;
   return (
      <div className={classes.account}>
         {modal}
          <span className={classes.name} onClick={onClick}>{username}</span>
            <img className={classes.ava} src={image} alt=""/>
         <div className={classes.buttoncontainer}>
            {deleteButton}
            {editButton}
         </div>
      </div>
   )
}

Account.defaultProps = {
   username: '',
   pic: '',
   login: '',
   slug: '',
   onClick: () => {}
 };
Account.propTypes = {
   username: PropTypes.string,
   pic: PropTypes.string,
   login: PropTypes.string,
   slug: PropTypes.string,
   onClick: PropTypes.func
 };

export default Account
