const path = require('path');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

// Load environment variables
dotenv.config();

console.log('Testing Email Configuration with nodemailer...');
console.log('CAREERS_SENDER_EMAIL:', process.env.CAREERS_SENDER_EMAIL);
console.log('CAREERS_RECEIVER_EMAIL:', process.env.CAREERS_RECEIVER_EMAIL);
console.log('SALES_SENDER_EMAIL:', process.env.SALES_SENDER_EMAIL);
console.log('SALES_RECEIVER_EMAIL:', process.env.SALES_RECEIVER_EMAIL);

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.CAREERS_SENDER_EMAIL,
    pass: process.env.CAREERS_SENDER_EMAIL_PASSWORD,
  },
});

async function run() {
  try {
    console.log('Verifying transporter connection...');
    await transporter.verify();
    console.log('Transporter connection verified successfully!');
    
    console.log('Sending test email...');
    const info = await transporter.sendMail({
      from: process.env.CAREERS_SENDER_EMAIL,
      to: process.env.CAREERS_RECEIVER_EMAIL,
      subject: 'Test Email from Inexo Backend',
      text: 'This is a test email to verify that nodemailer transporter configuration is working.',
    });
    console.log('Email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Envelope:', info.envelope);
    console.log('Accepted recipients:', info.accepted);
  } catch (error) {
    console.error('Error during email test:', error);
  }
}

run();
