// service/EmailService.js
const nodemailer = require("nodemailer");

// Create a transporter object using your SMTP service
const transporter = nodemailer.createTransport({
  service: "gmail", // Gmail service
  host: "smtp.gmail.com", // Gmail SMTP host
  port: 587,
  secure: false, // Use TLS
  auth: {
    user: process.env.SMTP_EMAIL, // Sender's email
    pass: process.env.SMTP_PASSWORD, // Your email password or App Password
  },
});

// Function to send the email verification
const sendConfirmationEmail = (user) => {
  const verificationUrl = `https://jgaa-projects-capstone.vercel.app/verify-email?token=${user.verification_token}`;

  const mailOptions = {
    from: process.env.SMTP_EMAIL, // Sender's email (Gmail)
    to: user.email, // Recipient's email
    subject: "Please Verify Your Email Address",
    text: `Click the following link to verify your email address`,
    html: `
     <p>Good day Sir!</p>
    <p>This is <b>Jgaa Thai Restaurant</b>. Please <b>Click</b> the following link to verify your email address:</p>
    <b>This link expires in 7 days</b>
    <p><a href="${verificationUrl}">${verificationUrl}</a></p>
    <p>If you did not request this, please ignore this email.</p>
    <footer>
      <p>This email was sent to: <b>${user.email} for protecting the security of your account. Please make sure to verify your email to complete your registration.</b></p>
     <p>Thank you for registering with us.</p>
      </footer>`,
    headers: {
      "X-Message-Tag": "verification_email", // Custom header to mark as legit
      "List-Unsubscribe": "<unsubscribe-link>", // Unsubscribe header
    },
  };

  // Send the email using the transporter
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email:", err);
      throw new Error("Error sending verification email");
    }
    console.log("Verification email sent:", info);
  });
};

module.exports = { sendConfirmationEmail };
