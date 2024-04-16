const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    userId : {
        type :String,
        ref  :"user",
        required :true
    },
    token : {
        type : String,
        required : true
    }

}, { collection: 'token' });


const Token = mongoose.model('token', tokenSchema);

module.exports = Token;