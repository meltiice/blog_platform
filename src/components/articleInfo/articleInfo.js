import React from "react"
import classes from './articleinfo.module.scss'
import heartNotActive from '../../images/heartNotActive.png'
import Account from "../account"

const ArticleInfo = (props) => {
   const { title, text, tagsList, author, likes, isLiked } = props;
   const tags = tagsList.length > 0 ? tagsList.map((tag, idx) => (
      <li key={idx*100} className={classes.tag}>{tag}</li>
      )) : null;
   return (
      <div className={classes.article}>
         <div className={classes.title}>
            <p className={classes['title-text']}>{title}</p>
            <div className={classes['likes-container']}>
               <img src={heartNotActive} alt=''/>
               <span>{likes}</span>
            </div>
         </div>
         <ul className={classes['tags-container']}>
            {tags}
         </ul>
         <p className={classes.text}>{text}</p>
         <Account username={author.username} pic={author.image}/>
      </div>
   )
}

export default ArticleInfo