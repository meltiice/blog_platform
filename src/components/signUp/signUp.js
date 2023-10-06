import classes from './signUp.module.scss'
import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom'
import Service from '../service';

const SignUp = () => {
   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('')
   const [passwordCheck, setPasswordCheck] = useState('')
   const [checkbox, setCheckbox] = useState(false);
   const [usernameDirty, setUsernameDirty] = useState(false)
   const [emailDirty, setEmialDirty] = useState(false);
   const [passwordDirty, setPasswordDirty] = useState(false)
   const [passwordCheckDirty, setPasswordCheckDirty] = useState(false)
   const [checkboxDirty, setCheckboxDirty] = useState(false)
   const [usernameError, setUsernameError] = useState('Имя не может быть пустым!')
   const [emailError, setEmailError] = useState('E-mail не может быть пустым!')
   const [passwordError, setPasswordError] = useState('Пароль не может быть пустым!')
   const [passwordCheckError, setPasswordCheckError] = useState('Пароли должны совпадать')
   const [checkboxError, setCheckboxError] = useState('Примите пользовательское соглашение')
   const [formValid, setFormValid] = useState(false)
   const [emailFind, passwordFind] = useState({email: '', password: ''})
   const dispatch = useDispatch();
   const service = new Service()
   useEffect(() => {
      console.log(emailError, passwordError, passwordCheckError, checkboxError, usernameError)
      if(emailError || passwordError || passwordCheckError || checkboxError || usernameError) {
         setFormValid(false)
      } else {
         setFormValid(true)
      }
   }, [emailError, passwordError, passwordCheckError, checkboxError, usernameError])

   const isLoged = useSelector((state) => {
      const { isLogIn } = state;
      return isLogIn;
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

  const passwordHandlerCheck = (e) => {
   setPasswordCheck(e.target.value)
      if(e.target.value !== password) {
         setPasswordCheckError('Пароли должны совпадать')
      } else {
         setPasswordCheckError('')
      }
      console.log('check', e.target.value, password)
  }

  const checkboxHandler = (e) => {
   setCheckbox((checkbox) => !checkbox)
   if (checkbox) {
      setCheckboxError('Примите пользовательское соглашение')
   } else {
      setCheckboxError('')
   }

   console.log(e.target.value)
  }

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'email': 
        setEmialDirty(true)
        break
      case 'password': 
        setPasswordDirty(true)
        break
      case 'passwordCheck':
         setPasswordCheckDirty(true)
         break
      case 'checkbox':
         setCheckboxDirty(true)
         break
      default:
         break
    }
  }
  const handleSubmit = (event) => {
   event.preventDefault();
   console.log(event.target)
   const user = {
      username: event.target[0].value,
      email: event.target[1].value,
      password: event.target[2].value
   }
   console.log('handleSubmit',user)
   dispatch(service.createUser({user}))
 }
   const formCreateAccount = isLoged ? <Redirect to='/articles'/> :(
      <div className={classes['sign-up']}>
         <h2 className={classes.heading}>Create New Account</h2>
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
                      onBlur={e => blurHandler(e)} 
                      name="email"/>
            </label>
            <label className={classes.label}>
               <p>Password</p>
               <input type="text" placeholder='Password' value={password}
                      onChange={e => passwordHandler(e)}
                      onBlur={e => blurHandler(e)}
                      name='password'/>
            </label>
            <label className={classes.label}>
               <p>Repeat Password</p>
               <input type="text" placeholder='Password' value={passwordCheck}
                      onChange={e => passwordHandlerCheck(e)}
                      onBlur={e => blurHandler(e)}
                      name='passwordCheck'/>
            </label>
            <div className={classes.divider}></div>
            <label className={classes.checkbox}>
               <input type='checkbox' value={checkbox}
                      onChange={e => checkboxHandler(e)}
                      onBlur={e => blurHandler(e)}
                      name='checkbox'/>
               <span className={classes.agreement}>I agree to the processing of my personal information</span>
            </label>
            <button disabled={!formValid} type='submit' className={classes.button}>Create</button>
            <p className={classes.already}>Already have an account? <Link to={'/sign-in'} className={classes.a}>Sign in</Link></p>
         </form>
      </div>
   )

   return (
      <React.Fragment>
         {formCreateAccount}
      </React.Fragment>
   )
}

export default SignUp