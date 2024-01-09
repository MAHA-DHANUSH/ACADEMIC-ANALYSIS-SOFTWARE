const mongoose=require("mongoose");
const marksSchema = new mongoose.Schema({
  name: String,
  marks: [Number],
  average: Number,
  email: String,
  additionalMarks: Number,
  mobile:Number,
});
const Marks = mongoose.model('Marks', marksSchema);

module.exports=Marks;