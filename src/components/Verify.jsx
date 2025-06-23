import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './Verify.css';

const Verify = () => {
  const [verificationStatus, setVerificationStatus] = useState('verifying');
  const [error, setError] = useState(null);
  const { token } = useParams();
  const navigate = useNavigate();


  return (
    <div className="verify-account-container">
      <div className="verify-account-card">
        <Link to={'/'} className="verify-account-logo">
          <strong>Prompt</strong>
          <span className='two'>2</span>
          <strong className='play'>Play</strong>
        </Link>
        
        {verificationStatus === 'verifying' && (
          <div className="verifying-status">
            <div className="spinner"></div>
            <h2>Verifying your account...</h2>
            <p>Please wait while we verify your email address.</p>
          </div>
        )}

        {verificationStatus === 'success' && (
          <div className="success-status">
            <div className="success-icon">✓</div>
            <h2>Account Verified!</h2>
            <p>Your email address has been successfully verified.</p>
            <p>You'll be redirected shortly...</p>
          </div>
        )}

        {verificationStatus === 'failed' && (
          <div className="failed-status">
            <div className="error-icon">✗</div>
            <h2>Verification Failed</h2>
            <p className="error-message">{error}</p>
            <button 
              onClick={handleResendEmail}
              className="resend-button"
            >
              {verificationStatus === 'resending' ? (
                'Sending...'
              ) : verificationStatus === 'resent' ? (
                'Email Resent!'
              ) : (
                'Resend Verification Email'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Verify;