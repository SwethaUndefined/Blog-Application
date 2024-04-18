import React, { useState } from "react";
import { requestPasswordReset } from "../api";
import { message } from "antd";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  // Pass the email to backend for sending the email for pasword reset
  const handleResetPassword = async () => {
    try {
    localStorage.setItem("resetEmail", email);
      let response = await requestPasswordReset({email});
      message.success("Password reset email sent. Please check your email.");
    } catch (error) {
      console.error("Error sending password reset email:", error);
      message.error("Email Id not Found.");
    }
  };

  return (
    <section className="registration-main">
      <div className="wrapper">
        <div className="input-box">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
            required
          />
          <i className="bx bxs-envelope"></i>
        </div>
        <button type="button" className="btn" onClick={handleResetPassword}>
          Reset Password
        </button>
      </div>
    </section>
  );
};

export default ForgotPassword;
