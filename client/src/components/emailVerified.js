import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom'; 

const EmailVerified = () => {

  return (
    <Result
      status="success"
      title="Email Verified!"
      subTitle="You have successfully verified your email address."
      extra={[
        <Button key="login">
          <Link to="/">Login</Link>
        </Button>
      ]}
    />
  );
};

export default EmailVerified;
