import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import PropTypes from 'prop-types'
import classes from './articleinfo.module.scss'
import heartNotActive from '../../images/heartNotActive.png'
import heartActive from '../../images/heartActive.png'
import Account from "../account"
import Service from "../service/service"

const ArticleInfo = (props) => {
   const service = new Service();
   const dispatch = useDispatch()
   const { title, text, tagsList, author, likes, isLiked, login, slug } = props;
   const [thislikeCount, setThisLikeCount] = useState(likes)
   const [thislike, setThisLike] = useState(isLiked)
   const tags = tagsList.length > 0 ? tagsList.map((tag, idx) => (
      <li key={idx * 100} className={classes.tag}>{tag}</li>
      )) : null;
   const userToken = useSelector((state) => {
      const { user } = state;
      return user.token;
   })
   const pic = thislike ? heartActive : heartNotActive;
   const likeArticle = () => {
      if (thislike) {
         setThisLike(false)
         setThisLikeCount((count) => count - 1)
         dispatch(service.unlikePost(slug, userToken))
      } else {
         setThisLike(true)
         setThisLikeCount((count) => count + 1)
      dispatch(service.likePost(slug, userToken))
      }
   }
   return (
      <div className={classes.article}>
         <div className={classes.title}>
            <p className={classes['title-text']}>{title}</p>
            <div className={classes['likes-container']}>
               <button onClick={(e) => {
                  e.stopPropagation();
                  likeArticle()
                  }}>
                     <img src={pic} alt=''/>
               </button>
               <span>{thislikeCount}</span>
            </div>
         </div>
         <ul className={classes['tags-container']}>
            {tags}
         </ul>
         <p className={classes.text}>{text}</p>
         <Account username={author.username} pic={author.image} login={login} slug={slug}/>
      </div>
   )
}

ArticleInfo.defaultProps = {
   title: '',
   text: '',
   tagsList: [],
   author: {},
   likes: 0,
   isLiked: false,
   login: '',
   slug: false
 };
ArticleInfo.propTypes = {
   title: PropTypes.string,
   text: PropTypes.string,
   login: PropTypes.bool,
   slug: PropTypes.string,
   tagsList: PropTypes.array,
   author: PropTypes.object,
   likes: PropTypes.number,
   isLiked: PropTypes.bool,
 };

export default ArticleInfo
