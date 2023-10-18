import { useDispatch, useSelector } from 'react-redux'
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
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
   const { itemId, username } = props;
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

   const isLoging = useSelector((state) => {
      const { isLogIn } = state;
      return isLogIn;
   })

   const isLoading = useSelector((state) => {
      const { loader } = state;
      return loader;
   })
   useEffect(() => {
      if (article) {
         setTitle(article.title)
         setText(article.body)
         setDescription(article.description)
         const tags = Object.fromEntries(article.tagList.map((tag, idx) => [String(idx), tag]))
         setTagsObj(tags)
         setCount(article.tagList.length);
         setTitleError(false)
         setTextError(false)
         setDescriptionError(false)
      }
      if (article && article.author.username !== username && itemId && !isLoging) {
         dispatch(deleteArticle())
         history.push('/sign-in')
      }
      if (article && article.author.username !== username && itemId && isLoging) {
         dispatch(deleteArticle())
         history.push('/articles')
      }
   }, [article]);

   useEffect(() => {
      if (titleError || descriptionError || textError) {
         setFormValid(false)
      } else {
         setFormValid(true)
      }
   }, [titleError, descriptionError, textError])

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

const handleTag = (idx, value) => {
   setTagsObj((tags) => {
      const newObj = { ...tags }
      newObj[idx] = value;
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
      tagList: Object.values(tagsObj).filter((val) => val !== '')
   }
   dispatch(service.createArticle(userInfo.token, { article: articleInfo }))
   history.push('/articles');
 }

 const handleSubmiteEdit = (event) => {
   event.preventDefault();
   const articleInfo = {
      title: event.target[0].value,
      description: event.target[1].value,
      body: event.target[2].value,
      tagList: Object.values(tagsObj).filter((val) => val !== '')
   }
   dispatch(service.putArticle(userInfo.token, { article: articleInfo }, itemId));
   history.push('/articles');
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
                  {Object.entries(tagsObj).map((tag) => <li key={tag[0]}>
                     <input placeholder='Tag' type='text' value={tag[1]}
                            onChange={(e) => handleTag(tag[0], e.target.value)}/>
                     <button type='button' onClick={() => { deleteTag(tag[0]) }}>
                        Delete
                     </button>
                  </li>)}
                  <li><button className={classes.additem} onClick={() => handleTags(tagsObj[count], count)} type="button">Add item</button></li>
               </ul>

            </label>
            <button disabled={!formValid || isLoading} type='submit' className={classes.button}>Send</button>
         </form>
      </div>
   )

   return <React.Fragment>
      {component}
   </React.Fragment>
}

CreateArticle.defaultProps = {
   username: ''
}

CreateArticle.propTypes = {
   username: PropTypes.string,
   itemId: PropTypes.string
}

export default CreateArticle
