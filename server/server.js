const express = require('express');
const twilio = require('twilio');
const accountSid = 'ACf782494c0c220bb63ef9ce42d6914065';
const authToken = 'b0fc45f7f0284b5fdfb051984e21db57';
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors');
const router=require("./routes/helloRoutes");
const Staff=require("./models/staffModel")
const app = express();
const Marks=require("./models/marksModel")

app.use(cors());
app.use(express.json());


mongoose.connect('mongodb+srv://admin:admin@cluster0.zgjaqce.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});


//Routers
app.use('/',router)
app.use('/staff',router)
app.use('/staffregister',router)

app.post('/stafflogin', (req, res) => {
  const { email, password } = req.body;

  Staff.findOne({ email, password })
  .then((staff) => {
    if (staff) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }
  })
  .catch((err) => {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' });
  });
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});