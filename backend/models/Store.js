const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    text: String,
  });
  
  const Store= mongoose.model('result', todoSchema);
  module.exports=Store;