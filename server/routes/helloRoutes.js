const express=require("express");
const router=express.Router()
const path=require("path");
const ExcelJS = require('exceljs');
const nodemailer=require("nodemailer")
const multer = require('multer');
const Marks=require("../models/marksModel")
const Staff=require("../models/staffModel")
const twilio = require('twilio');
const accountSid = 'AC83137434b6a8d030be6a7248eca77012';
const authToken = 'a1450516ea990e16fafb6621d161ae8b';
const client = new twilio(accountSid, authToken);

router.get('/', (req, res) => {
    res.send('Hello, world!');
  });


  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${__dirname}/uploads/`)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname + '-' + Date.now() + '.xlsx');
    }
  });
  
  const upload = multer({ storage: storage });
  router.post('/staff', upload.single('file'), async (req, res) => {
    if (!req.file) {
      console.log('No file uploaded');
      return res.status(400).send('No file uploaded');
    }
  
    const filePath = path.join(__dirname, 'uploads', req.file.filename);
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
  
    const worksheet = workbook.getWorksheet(1);
    const rowCount = worksheet.rowCount;
  
    const marksArray = [];
  
    // Calculate the average value of marks in each row and add it to column E
    for (let i = 2; i <= rowCount; i++) {
      const cellA = worksheet.getCell(`A${i}`);
      const cellB = worksheet.getCell(`B${i}`);
      const cellC = worksheet.getCell(`C${i}`);
      const cellD = worksheet.getCell(`D${i}`);
      const cellE = worksheet.getCell(`E${i}`);
      const cellF = worksheet.getCell(`F${i}`);
  
      let averageValue = null;
  
      if (cellD.value && cellE.value && cellF.value) {
        averageValue = (cellD.value + cellE.value + cellF.value) / 3;
      } else if (cellD.value && cellE.value) {
        averageValue = (cellD.value + cellE.value) / 2;
      } else if (cellD.value) {
        averageValue = cellD.value;
      } else {
        const ccet1Value = cellA.value;
        if (ccet1Value) {
          averageValue = ccet1Value;
        }
      }
  
      if (averageValue !== null) {
        const averageValueFixed = Number(averageValue.toFixed(2));
        console.log(cellA.value, averageValueFixed);
  
       // Calculate additional marks needed to pass the exam
let additionalMarks = 0;
let message = '';

if (cellD.value && !cellE.value && !cellF.value) {
  additionalMarks = 25 - cellD.value;
  message = `You should get extra ${additionalMarks} marks(25+${additionalMarks}) in CCET 2 to pass the Internals`;
} else if (cellD.value && cellE.value && !cellF.value) {
  additionalMarks = 25 - ((cellD.value + cellE.value) / 2);
  message = `You should get extra ${additionalMarks} marks(25+${additionalMarks}) in CCET 3 to pass the Internals`;
} else if (cellD.value && cellE.value && cellF.value) {
  const averageValueFixed = Number(averageValue.toFixed(2));
  if (averageValueFixed < 25) {
    additionalMarks = 25 - averageValueFixed;
    message = `Sorry,You failed the Internals`;
  } else {
    message = 'Congratulations, you passed the Internals!';
  }
} 

const cellG = worksheet.getCell(`G${i}`);
cellG.value = averageValueFixed || '';
await workbook.xlsx.writeFile(filePath);

// Get the email value from the cellB
let cellBValue = '';
if (typeof cellB.value === 'object') {
  cellBValue = cellB.value.text;
} else {
  cellBValue = cellB.value;
}

// Get the mobile value from the cellC
let cellCValue = '';
if (typeof cellC.value === 'object') {
  cellCValue = cellC.value.text;
} else {
  cellCValue = cellC.value;
}

// Store the name, marks, and email in MongoDB
const marks = new Marks({
  name: cellA.value,
  marks: [cellD.value, cellE.value, cellF.value],
  average: averageValueFixed || '',
  email: cellBValue,
  additionalMarks: additionalMarks || '',
  mobile: cellCValue
});
await marks.save();

    
        marksArray.push({ name: cellA.value, marks: averageValue });
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'dhanushpoy@gmail.com',
            pass: 'dzyd fjyb jnwi aper'
          }
        });
        
        
      let mailText = `Hi ${cellA.value},\nThis is regarding your Internal Marks.\nYour marks for the CCET are:\n\n`;

if (cellD.value) {
  mailText += `CCET-1: ${cellD.value}\n`;

  if (cellE.value) {
    mailText += `CCET-2: ${cellE.value}\n`;
   
    if (cellF.value) {
      mailText += `CCET-3: ${cellF.value}\n`;
    }
  }
}

mailText += `\nAverage: ${averageValue}\n${message}`;

const mailOptions = {
  from: 'dhanushpoy@gmail.com',
  to: cellBValue,
  subject: 'Dr.Mahalingam College of Engineering and Technology-CCET MARKS',
  text: mailText
};

        await transporter.sendMail(mailOptions); 

        try {
          // Construct the SMS message with the marks data
          const smsMessage = `Dear ${cellA.value},\nThis is regarding your Internal Marks.\nYour marks for the CCET are:\n\n CCET-1: ${cellD.value}\nCCET-2: ${cellE.value}\nCCET-3: ${cellF.value}\n\nAverage: ${averageValue}\n${message}`;
        


          // Send the SMS message using Twilio
          const twilioMessage = await client.messages.create({ body: smsMessage, from: '+15184994116', to: '+91'+cellCValue });
          console.log(twilioMessage.sid);


         


          //return res.status(200).json({ success: true, message: 'SMS sent successfully.' });
        } catch (err) {
          console.error(err);
          //return res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' });
        }
      }
    }
    
  
    res.json(marksArray);
    
  })


  router.post('/staffregister', (req, res) => {
    const staff = new Staff({
      name: req.body.name,
      mobile: req.body.mobile,
      email: req.body.email,
      password: req.body.password,
    });
  
    staff.save()
      .then(() => res.sendStatus(200))
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  });

module.exports=router