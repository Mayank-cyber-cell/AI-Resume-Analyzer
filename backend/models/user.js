const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    role: { 
         type: String,
         default: 'user'
    },
    photoUrl: {
        type: String,
    }
},{timestamps: true});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;