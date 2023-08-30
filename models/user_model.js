const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone:{
    type:String,
    required:true,
    unique:true
  },
  favorites:{
    type:[String],
    default:[]
  },
  createdAt: {
    type: String,
    default: Date.now().toString()
  },
  password: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'offline'
  },
  image: {
    type: String,
    default:null
  },
  location: {
    type: String,
    required: true
  }
});

// Define the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
