import React, { useContext, useEffect, useState } from 'react'

import './AuthForm.css'
import { AtSign, Loader, Lock, Mail, MailIcon, Phone, User, User2 } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthContext } from '../contexts/AuthContext';

const passwordRegex = /^[A-Z][A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{5,13}$/;

const nigerianPhoneRegex = /^(070|080|081|090|091)[0-9]{8}$/;

const signupFormSchema = yup.object({
  fullName:yup.string().required("Please provide Your Full Name").min(6, "Name must be at least 6 characters").max(30, "Name can't be more than 30 characters"),
  userName:yup.string().required("Please provide a Username").min(5, "Username must be at least 5 characters").max(12, "Username can't be more than 12 characters"),
  email:yup.string().required("Please provide your Email Address").email("Please enter a valid Email Address"),
  password:yup.string().required("Please provide a Password").matches(passwordRegex, 'Password must start with a capital letter, include special characters, and be 6-14 characters long'),
  phoneNumber:yup.string().required("Please Provide your Phone Number").matches(nigerianPhoneRegex, "Please provide a valid Nigerian Phone Number")
});
const signinFormSchema = yup.object({
  email:yup.string().required("Please provide your Email Address").email("Please enter a valid Email Address"),
  password:yup.string().required("Please provide a Password")
});

const AuthForm = () => {
  const location = useLocation();

  const {authRequest,isSigningUp,setIsSigningUp,isSigningIn,setIsSigningIn} = useContext(AuthContext);


  const {register, handleSubmit, formState:{errors, touchedFields},trigger} = useForm({
    resolver:yupResolver(location.pathname === "/signup" ? signupFormSchema : location.pathname === "/login" ? signinFormSchema : ""),
    mode:'onTouched',
    reValidateMode:'onChange',
  });

  const navigate = useNavigate()

  const submitSignupForm = async (data,e)=>{
    e.preventDefault();
    setIsSigningUp(true)
    try {
      localStorage.setItem("currentUserMail", data.email);
      const res = await authRequest(data, "signup");
      res.status === "success" && navigate("/verify")
    } catch (error) {
      console.log(error)
    }finally{
      setIsSigningUp(false)
    }
  };
  
  const submitSignInForm = async(data,e)=>{
    e.preventDefault()
    setIsSigningIn(true);
    try {
      const res = await authRequest(data, "signIn");
      if (res) {
        if (res.status === "success") {
          navigate("/generate")
          localStorage.setItem("accessToken", res.accessToken)
        }
      }
    } catch (error) {
      console.log(error)
    } finally{
      setIsSigningIn(false)
    }
  };
  
  return (
    <div className="container">
        <Link className="signupHeader" to="/">
          <strong className='prompt'>Prompt</strong>
          <span className='two'>2</span>
          <strong className='play'>Play</strong>
        </Link>
        <div className="formCon">
            {
              location.pathname === "/signup" ? (
              <>
                <div className="content">
                  <h3>Make Pro Videos in Minutes, For Free</h3>
                  <p>Prompt2Play helps you create, publish, and download like a pro. No experience needed.</p>
                </div>
                <form id='signupForm' className='authForm' onSubmit={handleSubmit(submitSignupForm)}>
                  <div className="user">
                    <label htmlFor="fullName"><User/></label>
                    <input 
                    type="text" 
                    name='fullName'
                    placeholder='Full Name'
                    {...register('fullName')}
                    />
                  </div>

                  {touchedFields.fullName && errors.fullName && (<p className='error'>{errors.fullName.message}</p>)}

                  <div className="user">
                    <label htmlFor="userName"><AtSign/></label>
                    <input 
                    type="text" 
                    name='userName'
                    placeholder='User Name'
                    {...register('userName')}
                    />
                  </div>
                  
                  {touchedFields.userName && errors.userName && ( <p className='error' >{errors.userName.message}</p>)}


                  <div className="mail">
                    <label htmlFor="email"><MailIcon/></label>
                    <input 
                    type="email" 
                    name='email'
                    placeholder='Email'
                    {...register('email')}
                    />
                  </div>

                  {touchedFields.email && errors.email && (<p className='error'>{errors.email.message}</p>)}

                  <div className="pass">
                    <label htmlFor="password"><Lock/></label>
                    <input 
                    type="password" 
                    name='password'
                    placeholder='Password'
                    {...register('password')}
                    />
                  </div>

                  {touchedFields.password && errors.password && (<p className='errorPassword'>{errors.password.message}</p>)}

                  <div className="phone">
                    <label htmlFor="phoneNumber"><Phone/></label>
                    <input 
                    type="text" 
                    name='phoneNumber'
                    placeholder='Phone Number'
                    {...register('phoneNumber')}
                    />
                  </div>

                  {touchedFields.phoneNumber && errors.phoneNumber && (<p className='error'>{errors.phoneNumber.message}</p>)}

                  <div className="authBtn">
                    <button disabled={isSigningUp}>
                      {!isSigningUp ? 'Sign Up' : ''}
                      {isSigningUp ? (<div className="spinner"></div>) : ''}
                    </button>
                  </div>

                  <div className="condition">
                    <p>Already have an account? <Link to={'/login'}>Log in</Link></p>
                  </div>
                </form>
              </>
              ) : (
                <>
                  <div className="content">
                    <h3>Missed You! Ready to Create Again?</h3>
                    <p>Sign in to Prompt2Play, your shortcut to pro videos.</p>
                  </div>
                  <form  className="authForm" id="loginForm" onSubmit={handleSubmit(submitSignInForm)}>
                    <div className="mail">
                      <label htmlFor="email"><User2/></label>
                      <input 
                      type="text" 
                      name='email'
                      placeholder='Email,Username or Phone'
                      {...register("email")}
                      />
                    </div>
                    
                    {touchedFields.email && errors.email && (<p className='errorMailSignIn'>{errors.email.message}</p>)}

                    <div className="pass">
                      <label htmlFor="password"><Lock/></label>
                      <input 
                      type="password" 
                      name='password'
                      placeholder='Password'
                      {...register("password")}
                      />
                    </div>
                    
                    {touchedFields.password && errors.password && (<p className='error'>{errors.password.message}</p>)}

                    <div className="authBtn">
                      <button disabled={isSigningIn}>{isSigningIn ? <div className='spinner'></div> : "Log In"}</button>
                    </div>
                    <div className="condition">
                      <p>Don't have an account? <Link to={'/signup'}>Sign up</Link></p>
                    </div>
                  </form>
                </>
              )
            }
        </div>
    </div>
  )
}

export default AuthForm