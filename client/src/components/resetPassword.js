import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { message, Input } from "antd";
import { updatePassword } from '../api';

const ResetPassword = () => {
    const { token } = useParams(); 
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [password,setPassword] = useState("");
     const [email,setEmail] = useState("")
    useEffect(() => {
        const storedEmail = localStorage.getItem("resetEmail");
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);
    const handleChange = (e)=>{
        setPassword(e.target.value)
    }
    // update the update after verify the email
    const handleSubmit = async () => {
        try {
            await updatePassword(email, password,token);
            message.success("Password updated successfully");
            setTimeout(()=>{
                window.location.href = "/login";
            },3000)
        } catch (error) {
            message.error("An error occurred while updating password. Please try again later.");
        }
    };
    return (
        <section className="registration-main">
      <div className="wrapper">
        <div className="input-box">
            <Input.Password
                className="inputpassword"
                type="password"
                name="password"
                placeholder="Password"
                 value={password}
                  onChange={handleChange}
                visibilityToggle={{
                    visible: passwordVisible,
                    onVisibleChange: setPasswordVisible,
                }}
                required
            />
            <i className="bx bxs-lock-alt"></i>
            </div>
            <button type="button" className="btn" onClick={handleSubmit}>
                    Update Password
                </button>
        </div>
        </section>
    );
}

export default ResetPassword;
