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

const AuthForm = () => {
  const {authRequest,isSuccess} = useContext(AuthContext);

  const [signingUp,setSigningUp] = useState(false)

  const {register, handleSubmit, formState:{errors, touchedFields},trigger} = useForm({
    resolver:yupResolver(signupFormSchema),
    mode:'onTouched',
    reValidateMode:'onChange',
  });

  const navigate = useNavigate()

  const submitSignupForm = async (data,e)=>{
    e.preventDefault();
    setSigningUp(true)
    try {
      localStorage.setItem("currentUserMail", data.email);
      await authRequest(data, "signup");
      isSuccess && navigate("/verify")
    } catch (error) {
      console.log(error)
    }finally{
      setSigningUp(false)
    }
  };

  
  const location = useLocation();
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
                    <button disabled={signingUp}>
                      {!signingUp ? 'Sign Up' : ''}
                      {signingUp ? (<div className="spinner"></div>) : ''}
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
                  <form  className="authForm" id="loginForm">
                    <div className="mail">
                      <label htmlFor="email"><MailIcon/></label>
                      <input 
                      type="email" 
                      name='email'
                      placeholder='Email'
                      />
                    </div>

                    <div className="pass">
                      <label htmlFor="password"><Lock/></label>
                      <input 
                      type="password" 
                      name='password'
                      placeholder='Password'
                      />
                    </div>
                    <div className="authBtn">
                      <button>Log in</button>
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