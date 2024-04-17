const crypto = require('crypto');
const nodemailer = require('nodemailer');

const sendPasswordResetEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service : "Gmail",
    auth : {
        user : "ramyaragu407@gmail.com",
        pass: process.env.PASS 
    }  });

    const resetLink = `http://localhost:3000/reset-password/${token}`; 

    const mailOptions = {
    from: 'ramyaragu407@gmail.com',
    to: email,
    subject: 'Password Reset Request',
    html: `<p>You requested a password reset. Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
};

 

module.exports = sendPasswordResetEmail