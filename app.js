
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const twilio = require('twilio');


dotenv.config();


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);


const app = express();


app.use(cors());
app.use(bodyParser.json());


app.post('/', (req, res) => {
  const { to } = req.body;

  client.messages
    .create({
      body: 'This is a test SMS message from your application.',
      from: twilioPhoneNumber,
      to: process.env.Reciver_Number
    })
    .then(() => {
      res.status(200).json({ message: 'SMS sent successfully.' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'An error occurred on the server.' });
    });
});



app.listen(5000, () => {
  console.log("Server is running");
});
