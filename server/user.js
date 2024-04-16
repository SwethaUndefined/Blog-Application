const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique :  true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  contactNumber: {
    type: Number,
    required: true
  },
  isVerified :{
    type : Boolean,
    default : false,
  }
}, { collection: 'users' });


const User = mongoose.model('User', userSchema);

module.exports = User;
