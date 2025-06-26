import './CheckMail.css';
import { MailCheck } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { toast } from 'sonner';

const CheckMail = () => {
  const currentUserMail = localStorage.getItem("currentUserMail");
  const {authRequest,currentUser,setCurrentUser} = useContext(AuthContext);
  const [resending, setResending] = useState(false)
  const [redirecting, setRedirecting] = useState(false)
  const [counting, setCounting] = useState(false);
  const [counter, setCounter] = useState(0);
  const navigate = useNavigate()

  const count = () => {
    setCounting(true);
    setCounter(60);

    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCounting(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  const resendMail = async (e)=>{
    e.preventDefault();
    setResending(true)
    try {
      await authRequest({email:currentUserMail}, "resendVMail");
      count()
    } catch (error) {
      console.log(error)
    } finally{
      setResending(false)
    }
  };

  const continueFnc = async (e)=>{
    e.preventDefault();
    setRedirecting(true)
    try {
      const res = await authRequest({email:currentUserMail}, "reloadUser");
      await setCurrentUser(res?.user)
      console.log(currentUser)
      if (res?.status === "success" && currentUser) {
        if (currentUser.isEmailVerified) {
          navigate("/login");
        } else {
          toast.error("Your email has not been verified. Please verify before continuing.");
        }
      }
    } catch (error) {
      console.log(error)
    } finally{
      setRedirecting(false)
    }
  };

  useEffect(() => {
    count();
  }, []);
  return (
    <div className="verify-container">
      <div className="verify-card">
        <MailCheck className="icon" size={64} />
        <h2>Check your email</h2>
        <p>We've sent a verification link to your email address.</p>
        <p>Please click the link to verify your account and get started.</p>

        <div className="actions">
          <button disabled={resending || counting} className='resend-btn' onClick={resendMail}>
          {resending
            ? "Resending..."
            : counting
            ? `Resend In ${counter}s`
            : "Resend Mail"}
          </button>
          <button className="continue-btn" disabled={redirecting} onClick={continueFnc}>{redirecting ? (<div className="spinner"></div>) : "Continue"}</button>
        </div>
      </div>
    </div>
  );
};

export default CheckMail;