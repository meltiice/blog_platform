import { useDispatch, useSelector } from 'react-redux'
import React, { useState, useEffect } from 'react';

import { Redirect, useHistory } from 'react-router-dom';
import classes from './createArticle.module.scss'
import { deleteArticle, errorCancel } from '../../redux/actions';
import Service from '../service';

const CreateArticle = (props) => {
   const [title, setTitle] = useState('');
   const [count, setCount] = useState(0);
   const [description, setDescription] = useState('')
   const [text, setText] = useState('');
   const [tagsObj, setTagsObj] = useState({})
   const [titleError, setTitleError] = useState('Заголовок не может быть пустым!')
   const [descriptionError, setDescriptionError] = useState('Описание не может быть пустым!')
   const [textError, setTextError] = useState('Поле текста не может быть пустым')
   const [formValid, setFormValid] = useState(false);
   const dispatch = useDispatch();
   const service = new Service()
   const history = useHistory()
   const { itemId } = props;
   useEffect(() => {
      dispatch(errorCancel())
      if (itemId) {
         dispatch(service.getArticle(itemId));
      }
   }, [])

   const article = useSelector((state) => {
      const { currentArticle } = state;
      return currentArticle;
   })

   useEffect(() => {
      if (article) {
         setTitle(article.title)
         setText(article.body)
         setDescription(article.description)
         const tags = Object.fromEntries(article.tagList.map((tag, idx) => [String(idx), tag]))
         setTagsObj(tags)
         console.log(tags, tagsObj, 'TAGS')

         setCount(article.tagList.length);
         setTitleError(false)
         setTextError(false)
         setDescriptionError(false)
      }
   }, [article]);

   useEffect(() => {
      if (titleError || descriptionError || textError) {
         setFormValid(false)
      } else {
         setFormValid(true)
      }
   }, [titleError, descriptionError, textError])

   const isLoging = useSelector((state) => {
      const { isLogIn } = state;
      return isLogIn;
   })
   const userInfo = useSelector((state) => {
      const { user } = state;
      return user;
   })

   const titleHandler = (e) => {
      setTitle(e.target.value)
      if (e.target.value) {
          setTitleError('')
      } else {
        setTitleError('Заголовок не может быть пустым!')
      }
  }

  const descriptionHandler = (e) => {
      setDescription(e.target.value)
      if (e.target.value) {
         setDescriptionError('')
      } else {
         setDescriptionError('Описание не может быть пустым!')
      }
  }

  const textHandler = (e) => {
   setText(e.target.value)
   if (e.target.value) {
      setTextError('')
   } else {
      setTextError('Поле текста не может быть пустым')
   }
}

const handleTag = () => {
   setTagsObj((tags) => {
      const field = String(count)
      const newObj = { ...tags }
      newObj[field] = text;
      console.log("NEW OBJECT: ", newObj)
      return newObj;
   })
}

const deleteTag = (key) => {
   setTagsObj((tags) => {
      const newObj = { ...tags }
      delete newObj[String(key)]
      return newObj;
   })
}

const handleTags = () => {
   setTagsObj((tags) => {
      const v = Object.fromEntries([[count, '']])
      const newObj = { ...tags, ...v }
      return newObj;
   })
   setCount((mCount) => {
      const newCount = mCount + 1;
      return newCount;
   })
}

  const handleSubmit = (event) => {
   event.preventDefault();
   const articleInfo = {
      title: event.target[0].value,
      description: event.target[1].value,
      body: event.target[2].value,
      tagList: Object.values(tagsObj)
   }
   dispatch(service.createArticle(userInfo.token, { article: articleInfo }))
   history.push('/articles')
 }

 const handleSubmiteEdit = (event) => {
   event.preventDefault();
   const articleInfo = {
      title: event.target[0].value,
      description: event.target[1].value,
      body: event.target[2].value,
      tagList: Object.values(tagsObj)
   }
   dispatch(service.putArticle(userInfo.token, { article: articleInfo }, itemId));
   dispatch(deleteArticle())
   history.push('/articles')
 }

 const func = itemId ? handleSubmiteEdit : handleSubmit;
 const pageName = itemId ? 'Edit Article' : 'Create New Article'

  const component = !isLoging ? <Redirect to={'/sign-in'}/> : (
      <div className={classes['new-article']}>
         <h2 className={classes.heading}>{pageName}</h2>
         <form className={classes.form} onSubmit={func}>
            <label className={classes.label}>
               <p>Title</p>
               <input type="text" placeholder='Title' value={title}
                      onChange={(e) => titleHandler(e)}
                      name="title"
                      className={titleError ? classes['form-color-error'] : null}
            />
            <p className={classes.errortext}>{titleError}</p>
            </label>
            <label className={classes.label}>
               <p>Short description</p>
               <input type="text" placeholder='Description' value={description}
                      onChange={(e) => descriptionHandler(e)}
                      name="description"
                      className={descriptionError ? classes['form-color-error'] : null}/>
                      <p className={classes.errortext}>{descriptionError}</p>
            </label>
            <label className={classes.label}>
               <p>Text</p>
               <input type="text" placeholder='Text' value={text}
                      onChange={(e) => textHandler(e)}
                      name="text" className={textError ? `${classes['form-color-error']} ${classes.text}` : classes.text}/>
                      <p className={classes.errortext}>{textError}</p>
            </label>
            <label className={classes.label}>
               <p>Tags</p>
               <ul className={classes.tagslist}>
                  {Object.values(tagsObj).map((tag, idx) => <li key={idx}>
                     <input placeholder='Tag' type='text' value={tag}
                            onChange={(e) => handleTag(idx, e.target.value)}/>
                     <button type='button' onClick={() => { deleteTag(idx) }}>
                        Delete
                     </button>
                  </li>)}
                  <li><button className={classes.additem} onClick={() => handleTags(tagsObj[count], count)} type="button">Add item</button></li>
               </ul>

            </label>
            <button disabled={!formValid} type='submit' className={classes.button}>Send</button>
         </form>
      </div>
   )

   return <React.Fragment>
      {component}
   </React.Fragment>
}

export default CreateArticle
