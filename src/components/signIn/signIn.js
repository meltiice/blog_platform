import { useDispatch, useSelector } from 'react-redux'
import React from 'react';
import { useState, useEffect } from 'react';
import classes from './signIn.module.scss'
import { logIn } from '../../redux/actions';
import { Link, Redirect } from 'react-router-dom';
import Service from '../service';

const SignIn = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('')
   const [emailDirty, setEmialDirty] = useState(false)
   const [passwordDirty, setPasswordDirty] = useState(false)
   const [emailError, setEmailError] = useState('E-mail не может быть пустым!')
   const [passwordError, setPasswordError] = useState('Пароль не может быть пустым!')
   const [formValid, setFormValid] = useState(false)
   const [emailFind, passwordFind] = useState({email: '', password: ''})
   const dispatch = useDispatch();
   const service = new Service()
   useEffect(() => {
      if(emailError || passwordError) {
         setFormValid(false)
      } else {
         setFormValid(true)
      }
   }, [emailError, passwordError])

   const isLoging = useSelector((state) => {
      const { isLogIn } = state;
      return isLogIn;
   })


   const colorClass = formValid ? 'form-color-basic' : 'form-color-error';
   console.log(colorClass, formValid)
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

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'email': 
        setEmialDirty(true)
        break
      case 'password': 
        setPasswordDirty(true)
        break
      default:
         break
    }
  }
  const handleSubmit = (event) => {
   event.preventDefault();
   console.log(event.target)
   const user = {
      email: event.target[0].value,
      password: event.target[1].value
   }
   console.log('handleSubmit',user)
   dispatch(service.loginUserIn({user}))
 }
  console.log("email:", email);
  const component = isLoging ? <Redirect to={'/articles'}/> : (
      <div className={classes['sign-in']}>
         <h2 className={classes.heading}>Sign In</h2>
         <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
            <label className={classes.label}>
               <p>Email Address</p>
               <input type="email" placeholder='Email Address' value={email} 
                      onChange={e => emailHandler(e)}
                      onBlur={e => blurHandler(e)} 
                      name="email"
            />
            </label>
            <label className={classes.label}>
               <p>Password</p>
               <input type="text" placeholder='Password' value={password} 
                      onChange={e => passwordHandler(e)}
                      onBlur={e => blurHandler(e)} 
                      name="password"/>
            </label>
            <button disabled={!formValid} type='submit' className={classes.button}>Login</button>
            <p className={classes.already}>Don't have an account? <Link to={'/sign-up'} className={classes.a}>Sign up</Link></p>
         </form>
      </div>
   )

   return <React.Fragment>
      {component}
   </React.Fragment>
}

export default SignIn