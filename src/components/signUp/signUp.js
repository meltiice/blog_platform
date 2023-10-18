import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom'
import classes from './signUp.module.scss'
import Service from '../service';

const SignUp = () => {
   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('')
   const [passwordCheck, setPasswordCheck] = useState('')
   const [checkbox, setCheckbox] = useState(false);
   const [usernameError, setUsernameError] = useState('Имя не может быть пустым!')
   const [emailError, setEmailError] = useState('E-mail не может быть пустым!')
   const [passwordError, setPasswordError] = useState('Пароль не может быть пустым!')
   const [passwordCheckError, setPasswordCheckError] = useState('Пароли должны совпадать')
   const [checkboxError, setCheckboxError] = useState('Примите пользовательское соглашение')
   const [formValid, setFormValid] = useState(false)
   const dispatch = useDispatch();
   const history = useHistory();
   const service = new Service()
   useEffect(() => {
      if (emailError || passwordError || passwordCheckError || checkboxError || usernameError) {
         setFormValid(false)
      } else {
         setFormValid(true)
      }
   }, [emailError, passwordError, passwordCheckError, checkboxError, usernameError])

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
      return loader;
   })
   useEffect(() => {
          if (isError) {
            if (isError.email) {
               setEmailError(`Your email ${isError.email}`);
            }
            if (isError.username) {
               setUsernameError(`Your username ${isError.username}`)
            }
            history.push('/sign-up')
          }
  }, [isError])

   const emailHandler = (e) => {
      setEmail(e.target.value)
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(String(e.target.value).toLowerCase())) {
          setEmailError('Некорректный E-mail!')
          if (!e.target.value) {
              setEmailError('E-mail не может быть пустым!')
          }
      } else {
        setEmailError('')
      }
  }

  const usernameHandler = (e) => {
   setUsername(e.target.value)
   if (!e.target.value) {
      setUsernameError('Имя не может быть пустым!')
   } else {
      setUsernameError('')
   }
  }

  const passwordHandler = (e) => {
      setPassword(e.target.value)
      if (e.target.value.length < 6 || e.target.value.length > 30) {
          setPasswordError('Пароль должен быть больше 6 или меньше 30')
          if (!e.target.value) {
              setPasswordError('Пароль не может быть пустым!')
          }
      } else {
        setPasswordError('')
      }
  }

  const passwordHandlerCheck = (e) => {
   setPasswordCheck(e.target.value)
      if (e.target.value !== password) {
         setPasswordCheckError('Пароли должны совпадать')
      } else {
         setPasswordCheckError('')
      }
  }

  const checkboxHandler = () => {
   setCheckbox((checkboxi) => !checkboxi)
   if (checkbox) {
      setCheckboxError('Примите пользовательское соглашение')
   } else {
      setCheckboxError('')
   }
  }

  const handleSubmit = (event) => {
   event.preventDefault();
   const user = {
      username: event.target[0].value,
      email: event.target[1].value,
      password: event.target[2].value
   }
   dispatch(service.createUser({ user }))
 }
   const formCreateAccount = isLoged ? <Redirect to='/articles'/> : (
      <div className={classes['sign-up']}>
         <h2 className={classes.heading}>Create New Account</h2>
         <form className={classes.form} onSubmit={handleSubmit}>
            <label className={classes.label}>
               <p>Username</p>
               <input type="text" placeholder='Username' value={username}
                      onChange={(e) => usernameHandler(e)}
                      name="username"
                      className={usernameError ? classes['form-color-error'] : null}/>
                      <p className={classes.errortext}>{usernameError}</p>
            </label>
            <label className={classes.label}>
               <p>Email Address</p>
               <input type="email" placeholder='Email Address' value={email}
                      onChange={(e) => emailHandler(e)}
                      name="email"
                      className={emailError ? classes['form-color-error'] : null}/>
                      <p className={classes.errortext}>{emailError}</p>
            </label>
            <label className={classes.label}>
               <p>Password</p>
               <input type="text" placeholder='Password' value={password}
                      onChange={(e) => passwordHandler(e)}
                      name='password'
                      className={passwordError ? classes['form-color-error'] : null}/>
                      <p className={classes.errortext}>{passwordError}</p>
            </label>
            <label className={classes.label}>
               <p>Repeat Password</p>
               <input type="text" placeholder='Password' value={passwordCheck}
                      onChange={(e) => passwordHandlerCheck(e)}
                      name='passwordCheck'
                      className={passwordCheckError ? classes['form-color-error'] : null}/>
                      <p className={classes.errortext}>{passwordCheckError}</p>
            </label>
            <div className={classes.divider}></div>
            <label className={classes.checkbox}>
               <input type='checkbox' value={checkbox}
                      onChange={(e) => checkboxHandler(e)}
                      name='checkbox'
                      className={checkboxError ? classes['form-color-error'] : null}/>
               <span className={classes.agreement}>I agree to the processing of my personal information</span>
            </label>
            <button disabled={!formValid || isLoading} type='submit' className={classes.button}>Create</button>
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
