import classes from './profile.module.scss'
import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom'
import Service from '../service';

const Profile = () => {
   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('')
   const [avatar, setAvatar] = useState('')
   const [usernameError, setUsernameError] = useState('')
   const [emailError, setEmailError] = useState('')
   const [passwordError, setPasswordError] = useState('')
   const [formValid, setFormValid] = useState(false)
   const history = useHistory();
   const dispatch = useDispatch();
   const service = new Service()
   useEffect(() => {
      console.log(emailError, passwordError, usernameError)
      if(emailError || passwordError || usernameError) {
         setFormValid(false)
      } else {
         setFormValid(true)
      }
   }, [emailError, passwordError, usernameError])

   const isLoged = useSelector((state) => {
      const { isLogIn } = state;
      return isLogIn;
   })
   const token = useSelector((state) => {
      const { user } = state;
      return user.token;
   })

   const emailHandler = (e) => {
      setEmail(e.target.value)
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!re.test(String(e.target.value).toLowerCase())) {
          setEmailError('Некорректный E-mail!')
          if(!e.target.value) {
              setEmailError('E-mail не может быть пустым!')
          }
      } else {
        setEmailError('')
      }
      console.log(e.target.value);
  }

  const usernameHandler = (e) => {
   setUsername(e.target.value)
   if (!e.target.value) {
      setUsernameError('Имя не может быть пустым!')
   }
   else {
      setUsernameError('')
   }
   console.log(e.target.value)
  }

  const passwordHandler = (e) => {
      setPassword(e.target.value)
      if(e.target.value.length < 6 || e.target.value.length > 8){
          setPasswordError('Пароль должен быть больше 6 или меньше 8')
          if(!e.target.value) {
              setPasswordError('Пароль не может быть пустым!')
          }
      } else {
        setPasswordError('')
      }
      console.log(e.target.value);
  }

  const avatarHandler = (e) => {
   setAvatar(e.target.value)

   console.log(e.target.value)
  }
  const handleSubmit = (event) => {
   event.preventDefault();
   console.log(event.target)
   const us = event.target[0].value ? {username: event.target[0].value} : null
   const em = event.target[1].value ? {email: event.target[1].value} : null
   const pas = event.target[2].value ? {password: event.target[2].value} : null
   const im = event.target[3].value ? {image: event.target[3].value} : null
   const user = { ...us , ...em, ...pas, ...im }
   console.log('handleSubmit',{user})
   dispatch(service.putUserInfo(token, {user}))
   history.push('/articles')
 }
   const formCreateAccount = !isLoged ? <Redirect to='/articles'/> :(
      <div className={classes['profile']}>
         <h2 className={classes.heading}>Edit Profile</h2>
         <form className={classes.form} onSubmit={handleSubmit}>
            <label className={classes.label}>
               <p>Username</p>
               <input type="text" placeholder='Username' value={username} 
                      onChange={e => usernameHandler(e)}
                      name="username"/>
            </label>
            <label className={classes.label}>
               <p>Email Address</p>
               <input type="email" placeholder='Email Address' value={email} 
                      onChange={e => emailHandler(e)}
                      name="email"/>
            </label>
            <label className={classes.label}>
               <p>New Password</p>
               <input type="text" placeholder='Password' value={password}
                      onChange={e => passwordHandler(e)}
                      name='password'/>
            </label>
            <label className={classes.label}>
               <p>Avatar Image (url)</p>
               <input type="text" placeholder='Avatar Image' value={avatar}
                      onChange={e => avatarHandler(e)}
                      name='passwordCheck'/>
            </label>
            <button disabled={!formValid} type='submit' className={classes.button}>Save</button>
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