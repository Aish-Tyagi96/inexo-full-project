const { ContactInquiry } = require('../models');
const logger = require('../utils/logger');
const nodemailer = require('nodemailer');

exports.submitContactForm = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      organizationName,
      inquiryType,
      category,
      subCategory,
      product,
      preferredDate,
      preferredTime,
      mobileNumber,
      message,
    } = req.body;

    // Save to database
    const inquiry = await ContactInquiry.create({
      firstName,
      lastName,
      organizationName,
      inquiryType,
      category,
      subCategory,
      product,
      preferredDate,
      preferredTime,
      mobileNumber,
      message,
    });

    // Send Email
    let senderEmail = '';
    let senderPassword = '';
    let receiverEmail = '';

    if (inquiryType === 'careers') {
      senderEmail = 'pravin@inexocast.in';
      senderPassword = process.env.PRAVIN_EMAIL_PASS || '';
      receiverEmail = 'HR@inexocast.in';
    } else if (inquiryType === 'sales') {
      senderEmail = 'suresh@inexocast.in';
      senderPassword = process.env.SURESH_EMAIL_PASS || '';
      receiverEmail = 'Sales@inexocast.in';
    }

    if (senderEmail && senderPassword && receiverEmail) {
      const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
          user: senderEmail,
          pass: senderPassword,
        },
      });

      const mailOptions = {
        from: senderEmail,
        to: receiverEmail,
        subject: `New ${inquiryType.toUpperCase()} Inquiry from ${firstName} ${lastName}`,
        text: `
          You have a new inquiry:

          Name: ${firstName} ${lastName}
          Organization: ${organizationName}
          Mobile: ${mobileNumber}
          Type: ${inquiryType}
          Category: ${category || 'N/A'}
          Sub Category: ${subCategory || 'N/A'}
          Product: ${product || 'N/A'}
          Preferred Date: ${preferredDate || 'N/A'}
          Preferred Time: ${preferredTime || 'N/A'}
          Message: ${message || 'N/A'}
        `,
      };

      try {
        await transporter.sendMail(mailOptions);
        logger.info({ inquiryId: inquiry.id }, 'Email sent successfully for contact inquiry');
      } catch (mailError) {
        logger.error({ error: mailError }, 'Failed to send email for contact inquiry');
        // Do not fail the API response if email fails, just log it
      }
    } else {
      logger.warn('Email credentials not fully configured, skipping email notification');
    }

    res.status(201).json({
      message: 'Inquiry submitted successfully',
      data: inquiry,
    });
  } catch (error) {
    logger.error({ error }, 'Error in submitContactForm');
    res.status(500).json({ message: 'Failed to submit inquiry' });
  }
};
