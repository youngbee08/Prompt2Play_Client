import React, { useContext, useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import "./ResetPassword.css"
import { AuthContext } from '../contexts/AuthContext';
import { Check, Mail, X } from 'lucide-react';
import { toast } from 'sonner';

const ResetPassword = () => {
  const location = useLocation();
  const {authRequest,checkIsAuthenticated} = useContext(AuthContext);
  const [requesting,setRequesting] = useState(false);
  const [reqestStatus, setReqestStatus] = useState('');
  const [reqestStatusMessage, setReqestStatusMessage] = useState('');
  const navigate = useNavigate();
  const useQuery = () =>{
    return new URLSearchParams(location.search)
  };
  const query = useQuery();
  const isForgot = query.get('forgot');
  const redirect = ()=>{
    toast.warning("Oops! You have to be logged in to perform this action")
  };
  useEffect(() => {
    isForgot === "false" || !isForgot ?  navigate("/login") : <Outlet/>
  }, [isForgot])
  
  const sendResetMail = async (e)=>{
    e.preventDefault();
    setRequesting(true);
    try {
      const formData = document.getElementById("form");
      const email = formData.email.value;
      const res = await authRequest({email},"requestforgotPasswordMail");
      if (res.status === "success") {
        setReqestStatus("sent")
        setReqestStatusMessage(res.message)
      }else{
        setReqestStatus("failed");
        setReqestStatusMessage(res.message)
      }
    } catch (error) {
      console.log(error)
    } finally{
      setRequesting(false)
    }
  };
  return (
    isForgot === "true" ? (
      <>
        {
          reqestStatus === "sent" ? (
            <>
              <div className="resetContainer">
                <div className="resetCard" style={{textAlign:"center"}}>
                  <div>
                    <div className="success-icon" style={{margin:"auto"}}><Check/></div>
                    <strong><p>{reqestStatusMessage}</p></strong>
                    <br />
                    <a href="https://mail.google.com" style={{display:"flex", justifyContent:"center", margin:"auto"}} target="_blank" rel="noopener noreferrer"><button style={{marginTop:".5rem", display:"flex", alignItems:"center", justifyContent:"center", gap:".8rem", border:"none"}} className='gmail'><Mail/>Open Gmail</button></a>
                  </div>
                </div>
              </div>
           </>
          ): reqestStatus === "failed" ? (
            <div className="resetContainer">
                <div className="resetCard">
                  <div style={{margin:"auto"}}>
                    <div className="error-icon" style={{margin:"auto"}}><X/></div>
                    <strong><p>{reqestStatusMessage}</p></strong>
                    <br />
                    <button onClick={()=>setReqestStatus("")}>Retry</button>
                  </div>
                </div>
            </div>
          )
          :(
            <form className='resetContainer' id='form' onSubmit={sendResetMail}>
              <div className="resetCard">
                <input required type="email" placeholder='Your Email Address' name='email'/>
                <button disabled={requesting} style={requesting ? {backgroundColor:"gray"} : {backgroundColor:"black"}}>{requesting ? "Please Wait" : "Reset Password"}</button>
              </div>
            </form>
          )
        }
      </>
    ):isForgot === "false" || location.pathname === "/updatePassword" ? (
      checkIsAuthenticated() ? (
        <>
          <form className='resetContainer' id='form'>
            <div className="resetCard">
              <input required type="text" placeholder='Old Password' name='oldPassword'/>
              <input required type="text" placeholder='New Password' name='NewPassword'/>
              <input required type="text" placeholder='Confirm New Password' name='confirmNewPassword'/>
              <button>Reset Password</button>
            </div>
          </form>
        </>
      ):(redirect())
    ):(
      null 
    )
  )
}

export default ResetPassword