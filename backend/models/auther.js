// models/Author.js
const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  picture: String,
  userId:{
    type:String,required:true
  },
  description: 
  {type:String,required:true},
  contact: String,
});

module.exports = mongoose.model('Author', authorSchema);
