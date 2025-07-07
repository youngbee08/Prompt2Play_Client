import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link, } from 'react-router-dom';
import './Verify.css';
import { AuthContext } from '../contexts/AuthContext';
import { Check, X } from 'lucide-react';

const Verify = () => {
  const [verificationStatus, setVerificationStatus] = useState('verifying');
  const [error, setError] = useState(null);
  const { token } = useParams();
  const {authRequest} = useContext(AuthContext);

  const verifyAcc = async () =>{
    try {
      let empty;
      const res = await authRequest(empty,`verify/${token}`);
      if (res?.status === "success") {
        setVerificationStatus("success")
      }else{
        setVerificationStatus("failed")
        setError(res?.message)
      }
    } catch (error) {
      console.log(error)
    }
  };


  useEffect(() => {
    verifyAcc()
  }, [])

  return (
    <div className="verify-account-container">
      <div className="verify-account-card">
        <Link to={''} className="verify-account-logo">
          <strong>Prompt</strong>
          <span className='two'>2</span>
          <strong className='play'>Play</strong>
        </Link>

        <br /> <br />
        
        {verificationStatus === 'verifying' && (
          <div className="verifying-status">
            <div className="spinner"></div>
            <h2>Verifying your account...</h2>
            <p>Please wait while we verify your email address.</p>
          </div>
        )}

        {verificationStatus === 'success' && (
          <div className="success-status">
            <div className="success-icon"><Check/></div>
            <h2>Account Verified!</h2>
            <p>Your email address has been successfully verified.</p>
            <p>You can now sign in</p>
          </div>
        )}

        {verificationStatus === 'failed' && (
          <div className="failed-status">
            <div className="error-icon"><X/></div>
            <h2>Verification Failed</h2>
            <p className="error-message">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Verify;