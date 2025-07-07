import React, { useContext, useState } from 'react'
import "./ResetPassword.css"
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPasswordFromMail = () => {
  const {authRequest} = useContext(AuthContext);
  const {token} = useParams()
  const [requesting,setRequesting] = useState(false);
  const [errorType,setErrorType] = useState('');
  const [errorMessage,setErrorMessage] = useState('');
  const navigate = useNavigate();
  const passwordRegex = /^[A-Z][A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{5,13}$/;
  const updatePassword = async (e)=>{
    e.preventDefault()
    const mailForm = document.getElementById("mailForm");
    const newPassword = mailForm.newPassword.value;
    const confirmNewPassword = mailForm.confirmNewPassword.value;
    setRequesting(true)
    try {
      if (!newPassword) {
        setErrorType("newPassword")
        setErrorMessage("New Password is required");
        return
      }
      if (!passwordRegex.test(newPassword)) {
        setErrorType("newPassword")
        setErrorMessage("Password must start with a capital letter, include special characters, and be 6-14 characters long");
        return
      }
      if (!confirmNewPassword) {
        setErrorType("confirmNewPassword")
        setErrorMessage("Confirm New Password is required");
        return
      }
      if (newPassword !== confirmNewPassword) {
        setErrorType("confirmNewPassword")
        setErrorMessage("Password doesn't match");
        return
      }
      setErrorType("")
      setErrorMessage("")
      const res = await authRequest({newPassword}, `setForgotPassword/${token}`);
      if (res.status === "success") {
        // toast.success("")
        navigate("/login")
      }
      
    } catch (error) {
      console.log(error)
    } finally{
      setRequesting(false)
    }
  }
  return (
    <form id='mailForm' className='resetContainer' onSubmit={updatePassword}>
      <div className="resetCard">
        <input  type="password" name="newPassword" id="newPassword" placeholder='New Password'/>
        {
          errorType === "newPassword" && <p className='errorPassword' style={{padding:"0"}}>{errorMessage}</p>
        }
        <input  type="password" name="confirmNewPassword" id="confirmNewPassword" placeholder='Confirm New Password'/>
        {
          errorType === "confirmNewPassword" && <p className='error' style={{padding:"0"}}>{errorMessage}</p>
        }
        <button disabled={requesting} style={requesting ? {backgroundColor:"gray"}:{backgroundColor:"black"}}>{requesting ? "Please wait..." : "Reset Password"}</button>
      </div>
    </form>
  )
}

export default ResetPasswordFromMail