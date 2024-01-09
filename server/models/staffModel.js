const mongoose=require("mongoose");
const staffSchema = new mongoose.Schema({
    name: String,
    mobile: Number,
    email: String,
    password: String,
  });
  
  
  const Staff = mongoose.model('Staff', staffSchema);
  module.exports=Staff