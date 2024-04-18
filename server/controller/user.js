const User = require("../model/user");
const Token = require("../model/token")
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const verifyEmail = require("../util/verifyEmail");
const sendPasswordResetEmail = require("../util/forgotPassword")
const saltRounds = 10;
const mongoose = require("mongoose");

module.exports = {
  // Login functionality with password check and email verification check
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
  
      if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
          if (!user.isVerified) {
            const token = new Token({
              userId: user._id,
              token: crypto.randomBytes(16).toString('hex')
            });
            await token.save();
            const link = `http://localhost:3000/confirm/${token.token}`;
            await verifyEmail(user.email, link);
            return res.status(403).json({
              success: false,
              error: "Email not verified. Please verify your email before logging in.",
            });
          } else {
            return res.status(200).json({ success: true, message: "Login successful" });
          }
        } else {
          return res.status(401).json({
            success: false,
            error: "Incorrect password. Please enter the correct password.",
          });
        }
      } else {
        return res.status(404).json({
          success: false,
          error: "Username not found. Please register to continue",
        });
      }
    } catch (error) {
      return res.status(500).json({ success: false, error: "Internal server error" });
    }
  },  
  // Register functionality with email verification
  register: async (req, res) => {
    const { username, password, email, contactNumber } = req.body;
    try {
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        if (existingUser.username === username) {
          return res.status(400).json({ success: false, error: "Username already exists" });
        } else if (existingUser.email === email) {
          return res.status(400).json({ success: false, error: "Email already exists" });
        }
      }

      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = new User({
        username,
        password: hashedPassword,
        email,
        contactNumber,
        isVerified : false,
      });

      const savedUser = await newUser.save();
       const token = new Token({
        userId : newUser._id,
        token : crypto.randomBytes(16).toString('hex')
       })
       await token.save()
       const link = `http://localhost:3000/confirm/${token.token}`
       await verifyEmail(email,link)
       res.status(200).json({ success: true, message: "Vertification mail send please check your Gmail" });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  },
  //Verify Email match with token in db and set to true
   verifyEmailToken : async (req, res) => {
    const { token } = req.params;
    try {
      const tokenRecord = await Token.findOne({ token });
      if (!tokenRecord) {
        return res.status(400).json({ success: false, error: "Invalid token" });
      }
  
      const user = await User.findById(tokenRecord.userId);
      if (!user) {
        return res.status(404).json({ success: false, error: "User not found" });
      }
  
      user.isVerified = true;
      await user.save();
        res.status(200).json({ success: true, message: "Email verified successfully" });
    } catch (error) {
      console.error("Error verifying email:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  },
  // Password reset mail sent
  requestPasswordReset: async (req, res) => {
    const { email } = req.body; 
    try {
      if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
      }
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      const token = new Token({
        userId: user._id,
        token: crypto.randomBytes(16).toString('hex')
      });
      await token.save();
  
      await sendPasswordResetEmail(email, token.token);
  
      res.status(200).json({ success: true, message: 'Password reset email sent' });
    } catch (error) {
      console.error('Error requesting password reset:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }, 
  //update password in db after email is verified 
  updatePassword: async (req, res) => {
    const { email, newPassword,token  } = req.body;
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
      user.password = hashedPassword;
      await user.save();
      User.deleteOne(token);
      res.status(200).json({ success: true, message: "Password updated successfully" });
    } catch (error) {
      console.error("Error resetting password:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  },
}