import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { verifyEmailCheck } from '../api';
import EmailVerified from './emailVerified';


const EmailConfirmationPage = () => {
  const { token } = useParams(); 
  const [loading, setLoading] = useState(true);
  const [verificationResult, setVerificationResult] = useState(null);

  useEffect(() => {
    verifyEmail();
  }, [token]); 

  const verifyEmail = async () => {
    try {
      const response = await verifyEmailCheck(token); 
    } catch (error) {
      console.error('Error in verifyEmail:', error);
    }
  };
  return (
    <div>
      {loading ? (
        <EmailVerified/>
      ) : (
        <h1>{verificationResult}</h1>
      )}
    </div>
  );
};

export default EmailConfirmationPage;
