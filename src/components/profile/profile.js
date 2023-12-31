import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom'
import classes from './profile.module.scss'
import Service from '../service';

const Profile = () => {
   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('')
   const [avatar, setAvatar] = useState('')
   const [emailError, setEmailError] = useState('')
   const [passwordError, setPasswordError] = useState('')
   const [avatarError, setAvatarError] = useState('')
   const [usernameError, setUsernameError] = useState('')
   const [formValid, setFormValid] = useState(false)
   const history = useHistory();
   const dispatch = useDispatch();
   const service = new Service()
   useEffect(() => {
      if (emailError || passwordError || avatarError || usernameError) {
         setFormValid(false)
      } else {
         setFormValid(true)
      }
   }, [emailError, passwordError, avatarError, usernameError])

   const isLoged = useSelector((state) => {
      const { isLogIn } = state;
      return isLogIn;
   })

   const isError = useSelector((state) => {
      const { error } = state;
      return error;
   })

   const isLoading = useSelector((state) => {
      const { loader } = state;
      return loader
   })

   useEffect(() => {
          if (isError) {
            if (!isError.start) {
               if (isError.email) {
                  setEmailError(`Your email ${isError.email}`);
               }
               if (isError.username) {
                  setUsernameError(`Your username ${isError.username}`)
               }
               if (isError.password) {
                  setPasswordError(`Your password ${isError.password}`)
               }
            }
            history.push('/profile')
          } else if (!isError) {
            history.push('/articles')
          }
  }, [isError])

   const token = useSelector((state) => {
      const { user } = state;
      return user.token;
   })

   const emailHandler = (e) => {
      setEmail(e.target.value)
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(String(e.target.value).toLowerCase()) && e.target.value.length > 0) {
          setEmailError('Некорректный E-mail')
      } else {
        setEmailError('')
      }
  }

  const usernameHandler = (e) => {
   setUsername(e.target.value)
   setUsernameError('')
  }

  const passwordHandler = (e) => {
      setPassword(e.target.value)
      if (e.target.value.length < 6 && e.target.value.length > 0 || e.target.value.length > 30) {
          setPasswordError('Пароль должен быть больше 6 или меньше 30')
      } else {
        setPasswordError('')
      }
  }

  const avatarHandler = (e) => {
   setAvatar(e.target.value)
   const re = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
   if (!re.test(String(e.target.value).toLowerCase()) && e.target.value.length > 0) {
      setAvatarError('Некорректная ссылка')
  } else {
    setAvatarError('')
  }
  }
  const handleSubmit = (event) => {
   event.preventDefault();
   const us = event.target[0].value ? { username: event.target[0].value } : null
   const em = event.target[1].value ? { email: event.target[1].value } : null
   const pas = event.target[2].value ? { password: event.target[2].value } : null
   const im = event.target[3].value ? { image: event.target[3].value } : null
   const user = { ...us, ...em, ...pas, ...im }
   dispatch(service.putUserInfo(token, { user }))
}
   const formCreateAccount = !isLoged ? <Redirect to='/articles'/> : (
      <div className={classes.profile}>
         <h2 className={classes.heading}>Edit Profile</h2>
         <form className={classes.form} onSubmit={handleSubmit}>
            <label className={classes.label}>
               <p>Username</p>
               <input type="text" placeholder='Username' value={username}
                      onChange={(e) => usernameHandler(e)}
                      name="username" className={usernameError ? classes['form-color-error'] : null}/>
                      <p className={classes.errortext}>{usernameError}</p>
            </label>
            <label className={classes.label}>
               <p>Email Address</p>
               <input type="email" placeholder='Email Address' value={email}
                      onChange={(e) => emailHandler(e)}
                      name="email" className={emailError ? classes['form-color-error'] : null}/>
                      <p className={classes.errortext}>{emailError}</p>
            </label>
            <label className={classes.label}>
               <p>New Password</p>
               <input type="text" placeholder='Password' value={password}
                      onChange={(e) => passwordHandler(e)}
                      name='password' className={passwordError ? classes['form-color-error'] : null}/>
                      <p className={classes.errortext}>{passwordError}</p>
            </label>
            <label className={classes.label}>
               <p>Avatar Image (url)</p>
               <input type="text" placeholder='Avatar Image' value={avatar}
                      onChange={(e) => avatarHandler(e)}
                      name='avatar' className={avatarError ? classes['form-color-error'] : null}/>
                      <p className={classes.errortext}>{avatarError}</p>
            </label>
            <button disabled={!formValid || isLoading} type='submit' className={classes.button}>Save</button>
         </form>
      </div>
   )

   return (
      <React.Fragment>
         {formCreateAccount}
      </React.Fragment>
   )
}

export default Profile
