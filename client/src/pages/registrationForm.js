import React, { useState } from "react";
import { message, Input } from "antd";
import "./registrationForm.css";
import { registerUser } from "../api";
import { useDispatch } from "react-redux"; 
import {setRegisterForm} from "../store/registerForm";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    contactNumber: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

    //Handle Register submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^\d{10,}$/.test(formData.contactNumber)) {
      message.warning(
        "Contact number must contain at least 10 digits and only numeric characters."
      );
      return;
    }
    try {
      const response = await registerUser(formData);
      if (response.success) {
        dispatch(setRegisterForm(formData));
        message.success("Vertification mail send please check your mail");
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("username", formData.username);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        message.error("Username or email already exists");
      } else {
        message.error("Unexpected error occurred");
      }
    }
  };

  //Already registered go to login page url
  const handleLoginClick = () => {
    window.location.href = "/";
  };

  return (
    <section className="registration-main">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          <div className="input-box">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <i className="bx bxs-envelope"></i>
          </div>
          <div className="input-box">
            <Input.Password
              className="inputpassword"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              visibilityToggle={{
                visible: passwordVisible,
                onVisibleChange: setPasswordVisible,
              }}
              required
            />
            <i className="bx bxs-lock-alt"></i>
          </div>
          <div className="input-box">
            <input
              type="text"
              name="contactNumber"
              placeholder="Contact Number"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
            <i className="bx bxs-phone"></i>
          </div>
          <button type="submit" className="btn">
            Register
          </button>
          <div className="login-link">
            <p>
              Already have an account?
              <a href="#" onClick={handleLoginClick} className="login">
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegistrationForm;
